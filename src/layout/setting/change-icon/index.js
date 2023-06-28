import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {changeIcon, getIcon} from 'react-native-change-icon';
import HeaderButton from '../../../components/header-button';
import styles from './styles';
import dispatcher from './dispatcher';
import states from './states';
import {getUserProfile, updateProfile} from '../../../shared/request';
import {iconNameToId, reloadUserProfile} from '../../../helpers/user';

const bannerIcon1 = require('../../../assets/app_icon_asset/first.png');
const bannerIcon2 = require('../../../assets/app_icon_asset/second.png');
const bannerIcon3 = require('../../../assets/app_icon_asset/third.png');
const bannerIcon4 = require('../../../assets/app_icon_asset/fourth.png');

function ModalChangeIcon({
  isVisible,
  onClose,
  selectModal,
  handleSetProfile,
  userProfile,
}) {
  const [selectedIcon, setSelectedIcon] = useState(userProfile.data.icon?.id);

  const listIcon = [
    {
      id: 1,
      name: 'first',
      icon: bannerIcon1,
    },
    {
      id: 2,
      name: 'second',
      icon: bannerIcon2,
    },
    {
      id: 3,
      name: 'third',
      icon: bannerIcon3,
    },
    {
      id: 4,
      name: 'fourth',
      icon: bannerIcon4,
    },
  ];

  useEffect(() => {
    const getInitialIcon = async () => {
      const isSetBefore = await AsyncStorage.getItem('customIcon');

      const resIcon = await getIcon();
      console.log('Check resIcon', resIcon);
      if (isSetBefore) {
        setSelectedIcon(iconNameToId(isSetBefore));
      }
    };
    getInitialIcon();
  }, []);

  const handleSubmit = async item => {
    try {
      const payload = {
        icon: item,
        _method: 'PATCH',
      };
      await updateProfile(payload);
      reloadUserProfile();
    } catch (err) {
      console.log('Error select:', err);
    }
  };

  function renderInput() {
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.txtInput}>
          Change the app icon for your home screen.
        </Text>
        <View style={styles.ctnRowIcon}>
          {listIcon.map((icon, index) => (
            <TouchableWithoutFeedback
              key={icon.id}
              onPress={() => {
                if (icon.id !== selectedIcon) {
                  changeIcon(icon.name)
                    .then(async () => {
                      setSelectedIcon(icon.id);
                      await AsyncStorage.setItem('customIcon', icon.name);
                      handleSubmit(icon.id);
                      // selectModal();
                    })
                    .catch(e => {
                      Alert.alert("Sorry, can't change icon at this time.");
                      console.log('Error change icon:', e.message);
                    });
                }
              }}>
              <View
                style={[
                  styles.iconWrapper,
                  selectedIcon === icon.id && styles.activeIcon,
                ]}>
                <View style={[styles.ctnIconApp]}>
                  <Image source={icon.icon} style={styles.ctnIconStyle} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    );
  }

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={onClose}>
      <View style={styles.ctnRoot}>
        <View style={styles.ctnContent}>
          <HeaderButton title="Change app icon" onPress={onClose} />
          {renderInput()}
        </View>
      </View>
    </Modal>
  );
}

ModalChangeIcon.propTypes = {
  handleSetProfile: PropTypes.func.isRequired,
  userProfile: PropTypes.object.isRequired,
};

export default connect(states, dispatcher)(ModalChangeIcon);
