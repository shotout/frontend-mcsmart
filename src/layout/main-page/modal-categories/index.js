import React, {useEffect, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Portal} from 'react-native-paper';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Search from '../../../components/search';
import styles from './styles';
import states from './states';
import {isUserPremium, reloadUserProfile} from '../../../helpers/user';
import {sizing} from '../../../shared/styling';
import Button from '../../../components/button';
import PremiumRocket from '../../../assets/svg/RocketPremiumBlack.svg';
import {updateCategory} from '../../../shared/request';
import CategoryItem from '../../../components/category-item';
import ModalCategoriesSearch from '../modal-categories-search';
import useDebounce from '../../../helpers/useDebounce';
import {showModalPremium} from '../../../shared/globalContent';

const iconClose = require('../../../assets/icons/close.png');

function ModalCategories({
  onClose,
  categories,
  userProfile,
  contentRef,
  fullSize,
  onCustomSelectCategory,
}) {
  const [categoryValue, setCategoryValue] = useState([]);
  const [showModalSearch, setModalSearch] = useState(false);
  const debounceReloadCategory = useDebounce(categoryValue, 5000);
  const draggableRange = {
    top: fullSize
      ? sizing.getDimensionHeight(1)
      : sizing.getDimensionHeight(1) - StatusBar.currentHeight,
    bottom: 0,
  };
  const [panelPositionVal] = useState(
    new Animated.Value(draggableRange.bottom),
  );
  const snappingPoints = [draggableRange.top, draggableRange.bottom];

  useEffect(() => {
    const getInitialCategory = () => {
      if (userProfile.data.categories?.length > 0) {
        setCategoryValue(userProfile.data.categories.map(item => item.id));
      }
    };
    getInitialCategory();
  }, [userProfile.data.categories]);

  const isDataSelected = value => {
    const findItem = categoryValue.find(item => item === value);
    if (findItem) return true;
    return false;
  };

  const handleSelectCategory = async (id, isHasSelect) => {
    let curentCategory = [...categoryValue];
    if (isHasSelect) {
      curentCategory = curentCategory.filter(cat => cat !== id);
    } else {
      curentCategory.push(id);
    }
    setCategoryValue(curentCategory);
    await updateCategory({
      categories: curentCategory,
      _method: 'PATCH',
    });
    reloadUserProfile();
  };

  function renderSubscription() {
    if (isUserPremium()) {
      return null;
    }
    return (
      <View style={styles.ctnBgWrap}>
        <TouchableWithoutFeedback onPress={showModalPremium}>
          <View style={styles.ctnRow}>
            <View style={styles.ctnRowLeft}>
              <Text style={styles.titleStyle}>Go Premium</Text>
              <Text style={styles.subTitleStyle}>
                Access unlimited categories, Facts, themes and remove ads!
              </Text>
            </View>
            <View style={styles.ctnIcon}>
              <PremiumRocket width="100%" height="100%" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  function renderLabel() {
    return (
      <View style={styles.ctnLabel}>
        <Text style={styles.txtMix}>Make your own mix</Text>
      </View>
    );
  }

  function renderHeader(dragHandler = {}) {
    return (
      <View style={styles.ctnHeader} {...dragHandler}>
        <View style={styles.ctnTextHeader}>
          <Text style={styles.boldHeader}>Categories</Text>
          <Text style={styles.txtDesc}>
            {'Choose the topics that you\nwant to learn more about.'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalSearch(true);
          }}>
          <Search isSelect placeholder="Search" />
        </TouchableOpacity>
        {renderSubscription()}
        {renderLabel()}
      </View>
    );
  }

  function renderIconClose() {
    if (onCustomSelectCategory) {
      return (
        <Button
          btnStyle={styles.ctnStyle}
          label="Save"
          onPress={() => {
            onCustomSelectCategory(categoryValue);
            setCategoryValue([]);
            onClose();
          }}
        />
      );
    }
    return (
      <TouchableOpacity style={styles.btnStyle} onPress={onClose}>
        <Image source={iconClose} style={styles.btnClose} />
      </TouchableOpacity>
    );
  }

  const renderListCategory = ({item, index}) => {
    const isSelected = isDataSelected(item.id);
    return (
      <CategoryItem
        onPress={() => {
          handleSelectCategory(item.id, isSelected);
        }}
        isSelected={isSelected}
        item={item}
      />
    );
  };

  return (
    <Portal>
      <SlidingUpPanel
        ref={contentRef}
        animatedValue={panelPositionVal}
        draggableRange={draggableRange}
        snappingPoints={snappingPoints}
        backdropOpacity={0}
        showBackdrop={false}
        height={draggableRange.top}
        allowDragging
        // allowDragging={allowDragging}
        // onMomentumDragEnd={onMomentumDragEnd}
        // onDragStart={onDragStart}
      >
        {dragHandler => (
          <View style={styles.ctnRoot}>
            <TouchableWithoutFeedback onPress={onClose}>
              <View style={styles.ctnClose} />
            </TouchableWithoutFeedback>
            <View style={styles.ctnContent}>
              {/* <LineGestureSlide dragHandler={dragHandler} /> */}
              <FlatList
                contentContainerStyle={styles.ctnScroll}
                data={categories?.category || []}
                ListHeaderComponent={renderHeader(dragHandler)}
                renderItem={renderListCategory}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              />

              {renderIconClose()}
            </View>

            {showModalSearch && (
              <ModalCategoriesSearch
                onClose={() => {
                  setModalSearch(false);
                }}
                selectedCategory={categoryValue}
                isVisible={showModalSearch}
              />
            )}
          </View>
        )}
      </SlidingUpPanel>
    </Portal>
  );
}

ModalCategories.propTypes = {
  categories: PropTypes.object,
  userProfile: PropTypes.object.isRequired,
};

ModalCategories.defaultProps = {
  categories: {
    popular: [],
    category: [],
  },
};

export default connect(states)(ModalCategories);
