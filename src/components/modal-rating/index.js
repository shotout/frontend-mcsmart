import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, Image, Linking, Platform} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {askRating} from '../../shared/askRating';
import styles from './styles';
import dispatcher from './dispatcher';
import IconClose from '../../assets/svg/icon_close.svg';
import Button from '../button';
import {giveRating} from '../../shared/request';
import { STORE } from '../../shared/static';

const ratingIcon = require('../../assets/icons/rating_star.png');
const unSelectRatingStar = require('../../assets/icons/unselect_rating_star.png');
const bannerRating = require('../../assets/icons/banner_rating.png');

function ModalRating({handleClose, visible}) {
  const [ratingSelected, setRatingSelected] = useState(0);

  const linkIOS = STORE.appstore.replace("https", "itms-apps");

  const handleSubmit = () => {
    if (ratingSelected === 5 || ratingSelected === 4) {
      // askRating(ratingSelected);
      if (Platform.OS === 'ios'){
        Linking.canOpenURL(linkIOS).then(
          (supported) => {
            supported && Linking.openURL(linkIOS);
          },
          (err) => console.log(err)
        );
      } else {
        Linking.openURL(STORE.playstore);
      }
    }
    giveRating({value: ratingSelected});
    handleClose();
  };

  const increaseSkipRating = async () => {
    const currentRating = await AsyncStorage.getItem('skipRatingCount');

    if (currentRating) {
      const counterToString = (Number(currentRating) + 1).toString();
      await AsyncStorage.setItem('skipRatingCount', counterToString);
    } else {
      await AsyncStorage.setItem('skipRatingCount', '1');
    }
  };

  const handleCloseIcon = () => {
    handleClose();
    increaseSkipRating();
  };

  function renderIconClose() {
    return (
      <View style={styles.btnStyle}>
        <TouchableOpacity onPress={handleCloseIcon}>
          <View style={styles.btnClose}>
            <IconClose width="100%" height="100%" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.ctnContent}>
        <View style={styles.itemWrapper}>
          <View style={styles.ctnBanner}>
            <Image source={bannerRating} style={styles.bannerStyle} />
          </View>
          <Text style={styles.txtTitle}>Enjoying McSmart?</Text>
          <Text style={styles.txtDesc}>
            {`Tap a star to rate our app and\nhelp the community grow.`}
          </Text>
          <View style={styles.ctnIcon}>
            {Array.apply(null, Array(ratingSelected)).map((x, i) => (
              <TouchableOpacity
                key={i.toString()}
                onPress={() => {
                  setRatingSelected(i + 1);
                }}>
                <Image source={ratingIcon} style={styles.ratingImageStyle} />
              </TouchableOpacity>
            ))}
            {Array.apply(null, Array(5 - ratingSelected)).map((x, i) => (
              <TouchableOpacity
                key={i.toString()}
                onPress={() => {
                  setRatingSelected(ratingSelected + i + 1);
                }}>
                <Image
                  source={unSelectRatingStar}
                  style={styles.ratingImageStyle}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Button
            type="black"
            label="Submit"
            onPress={handleSubmit}
            btnStyle={styles.btnSubmitStyle}
          />
          {renderIconClose()}
        </View>
      </View>
    </Modal>
  );
}

export default connect(undefined, dispatcher)(ModalRating);
