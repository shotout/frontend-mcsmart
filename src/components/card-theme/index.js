import React, {useEffect, useState} from 'react';
import {ImageBackground, TouchableWithoutFeedback, View} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import IconLockWhite from '../../assets/svg/icon_lock_color_white.svg';
import IconChecklist from '../../assets/svg/icon_checklist.svg';
import states from './states';
import dispatcher from './dispatcher';
import {handlePayment, isUserPremium} from '../../helpers/user';
import LoadingIndicator from '../loading-indicator';
import {setUserTheme} from '../../store/defaultState/actions';
import {listTheme} from '../../shared/static-data/listTheme';

const iconSuffle = require('../../assets/images/random_theme.png');

function CardTheme({userThemes, onClose}) {
  const shuffleData = {
    background: null,
    background_color: null,
    id: 1,
    is_free: 1,
    name: 'Random',
    status: 2,
  };
  const [selectedCard, setSelectedCard] = useState([]);
  const [isLoading, setLoading] = useState(null);

  useEffect(() => {
    if (userThemes) {
      setSelectedCard([userThemes.id]);
    }
  }, [userThemes]);

  const isDataSelected = value => {
    const findItem = selectedCard.find(item => item === value);
    if (findItem) return true;
    return false;
  };

  const handleSubmit = async item => {
    setUserTheme(item);
    onClose();
  };

  const onPressSelect = value => {
    // const isSelected = isDataSelected(value);
    // if (isSelected) {
    //   setSelectedCard(selectedCard.filter(item => item !== value));
    // } else {
    //   const mainData = [...selectedCard];
    //   mainData.push(value);
    //   setSelectedCard(mainData);
    //   handleSubmit(value);
    // }
    // const arrSelected = [value];
    // if (value !== selectedCard[0]) {
    //   setLoading(value);
    //   setSelectedCard(arrSelected);
    // }
    handleSubmit(value);
  };

  const handleItem = item => {
    if (item.is_free === 1 || isUserPremium()) {
      onPressSelect(item);
      if (item.id === 6) {
        AsyncStorage.removeItem('randomThemes');
      }
      return true;
    }
    if (!isUserPremium()) {
      handlePayment('in_app_paywall');
    }
    return true;
    // onPressSelect(item.id);
  };

  function renderLogo(item, isGetSelect) {
    if (item.is_free === 0 && !isUserPremium()) {
      return (
        <View style={styles.ctnIcon}>
          <View style={styles.ctnIconItem}>
            <IconLockWhite width="100%" height="100%" />
          </View>
        </View>
      );
    }
    if (!isGetSelect) {
      return <View style={styles.whiteBg} />;
    }
    if (isGetSelect) {
      return (
        <View style={styles.whiteBg}>
          <View style={styles.ctnIconItemCheklist}>
            <IconChecklist width="100%" height="100%" />
          </View>
        </View>
      );
    }
    return null;
  }

  function renderContent() {
    if (listTheme?.length > 0) {
      return listTheme.map(item => {
        if (item.id === 1) {
          return null;
        }
        return (
          <TouchableWithoutFeedback
            key={item.id}
            onPress={() => {
              handleItem(item);
            }}>
            <View style={[styles.ctnCard]}>
              <View style={styles.ctnRowCard}>
                <ImageBackground
                  source={item.imgLocal}
                  style={styles.ctnImgItem}>
                  {renderLogo(item, isDataSelected(item.id))}

                  {isLoading === item.id && (
                    <View style={styles.ctnLoader}>
                      <LoadingIndicator />
                    </View>
                  )}
                </ImageBackground>
                {/* {renderRandom()} */}
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      });
    }
    return null;
  }

  return (
    <View style={styles.themeWrapper}>
      <View style={styles.shuffleWrapper}>
        <TouchableWithoutFeedback
          onPress={() => {
            handleItem(shuffleData);
          }}>
          <View style={[styles.ctnCard]}>
            <View style={styles.ctnRowCard}>
              <ImageBackground source={iconSuffle} style={styles.ctnImgItem}>
                {renderLogo(shuffleData, isDataSelected(shuffleData.id))}

                {isLoading === shuffleData.id && (
                  <View style={styles.ctnLoader}>
                    <LoadingIndicator />
                  </View>
                )}
              </ImageBackground>
              {/* {renderRandom()} */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={[styles.ctnRowIcon]}>{renderContent()}</View>
    </View>
  );
}

CardTheme.propTypes = {};

CardTheme.defaultProps = {};

export default connect(states, dispatcher)(CardTheme);
