import React, {Fragment, useState} from 'react';
import {TouchableWithoutFeedback, View, Text, Image} from 'react-native';
import IconChecklist from '../../assets/svg/icon_checklist.svg';
import IconChecklistWhite from '../../assets/svg/checklist_white.svg';
import IconLockWhite from '../../assets/svg/lock_white_icon.svg';
import {BACKEND_URL} from '../../shared/static';
import styles from './styles';
import ModalUnlockCategory from '../modal-unlock-ads';
import {isUserPremium} from '../../helpers/user';
import {colors} from '../../shared/styling';
import { getListFactRegister } from '../../shared/request';

const adsIcon = require('../../assets/icons/ads_icon.png');
const categoryAdsIcon = require('../../assets/icons/category_icon.png');

const CategoryItem = ({onPress, item, isSelected}) => {
  const [showUnlockByAds, setUnlockByAds] = useState(false);
  const isGeneralCategory = item.id === 1;

  const handlePressAds = () => {
    if (item.is_free === 0 && !isUserPremium()) {
      setUnlockByAds(true);
    } else {
      onPress();
    }
  };
  const handleFetch = async (id) => {
    const params = {
      id,
    };
    fetchListQuote(params)
  }

  const fetchListQuote = (params, isPassPremium) => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const {freeUserPremium} = store.getState().defaultState;
      let isFreeUserPremium = isPremiumToday();
      const todayDate = moment().format('YYYY-MM-DD');
      if (
        isPremiumToday() &&
        !isUserPremium() &&
        todayDate !== freeUserPremium
      ) {
        isFreeUserPremium = false;
      }
      dispatch({type: types.START_FETCH_QUOTES});
      const quote = await getListFactRegister({
        length: isFreeUserPremium || isPassPremium ? 1000 : 15,
        page: 1,
        ...params,
      });
      let restPas = [];
      if (!isUserPremium()) {
        const pastQuote = await getListFactRegister({ length: isFreeUserPremium || isPassPremium ? 1000 : 5,
          page: 1,
          ...params,});
        restPas = isArray(pastQuote?.data)
          ? pastQuote?.data
          : pastQuote?.data?.data || dummyPastQuotes;
      }
      if (quote.data?.data?.length > 0) {
        let overallData = [...restPas, ...quote.data.data];
        if (!isFreeUserPremium && !isPassPremium) {
          overallData = [
            ...[{item_type: 'countdown_page'}],
            ...restPas,
            ...quote.data.data,
            ...[{item_type: 'countdown_page'}],
          ];
          overallData = overallData.map((ctn, itemIndex) => {
            if (
              itemIndex === 2 ||
              itemIndex === 5 ||
              itemIndex === 8 ||
              itemIndex === 12
            ) {
              return {
                ...ctn,
                item_type: 'in_app_ads',
              };
            }
            return ctn;
          });
        } else if (!isUserPremium()) {
          overallData = overallData.map((ctn, itemIndex) => {
            if (
              itemIndex === 2 ||
              itemIndex === 5 ||
              itemIndex === 8 ||
              itemIndex === 12 ||
              itemIndex === 16
            ) {
              return {
                ...ctn,
                item_type: 'in_app_ads',
              };
            }
            if (itemIndex > 16) {
              if (itemIndex % 4 === 0) {
                return {
                  ...ctn,
                  item_type: 'in_app_ads',
                };
              }
            }

            return {
              ...ctn,
              item_type: 'normal_quote',
            };
          });
        }
        dispatch({
          type: types.SUCCESS_FETCH_QUOTE,
          payload: quote.data,
          arrData: overallData,
          listBasicQuote:
            isFreeUserPremium || isPassPremium ? [] : quote.data.data,
          restPassLength: restPas?.length,
          isPassPremium,
          isFreeUserPremium:
            isFreeUserPremium || isPassPremium ? todayDate : null,
        });
      }
      resolve(quote);
    } catch (err) {
      console.log('ERr fetch quote:', err);
      dispatch({type: types.ERROR_FETCH_QUOTES});
      reject(err);
    }
  });
  function renderSelectedBox() {
    if (!isUserPremium() && item.is_free === 0 && !isSelected) {
      return (
        <View style={styles.ctnSelectPremium}>
          <View
            style={[styles.ctnIconIndicator, {backgroundColor: colors.black}]}>
            <View style={styles.ctnIconItem}>
              <IconLockWhite width="100%" height="100%" />
            </View>
          </View>

          <View style={styles.ctnAdsIcon}>
            <Image source={adsIcon} style={styles.iconAds} />
            <Text style={styles.txtAds}>Free</Text>
          </View>
        </View>
      );
    }
    return (
      <View
        style={[
          styles.ctnIconIndicator,
          isGeneralCategory ? styles.bgGray : {},
        ]}>
        <View style={styles.ctnIconItem}>
          {isGeneralCategory ? (
            <IconChecklistWhite width="100%" height="100%" />
          ) : isSelected ? (
            <IconChecklist width="100%" height="100%" />
          ) : (
            <IconChecklistWhite width="100%" height="100%" />
          )}
        </View>
      </View>
    );
  }

  return (
    <>
      <TouchableWithoutFeedback
        onPress={handlePressAds}
        disabled={isGeneralCategory}>
        <View style={styles.ctnItemCategory}>
          <View style={styles.checklistContainer}>{renderSelectedBox()}</View>
          <View style={styles.ctnText}>
            <Text style={styles.txtCategory}>{item.name}</Text>
          </View>
          <View style={styles.ctnIconCategory}>
            <Image
              source={{uri: `${BACKEND_URL}${item.icon.url}`}}
              style={styles.imgIconStyle}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {showUnlockByAds && (
        <ModalUnlockCategory
          visible={showUnlockByAds}
          handleClose={(selectedCategory) => {
            handleFetch(selectedCategory.id)
            setUnlockByAds(false);
          }}
          imgSource={categoryAdsIcon}
          selectedCategory={item}
          handleUnlock={onPress}
        />
      )}
    </>
  );
};

export default CategoryItem;
