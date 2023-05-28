import React from 'react';
import {Image, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {navigate} from '../../shared/navigationRef';
import styles from './styles';
import states from './states';
import Button from '../../components/button';

const bgImage = require('../../assets/images/welcome_banner.png');

function WelcomePage() {
  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnIcon}>
        <View style={styles.ctnLogoIcon}>
          <Image source={bgImage} style={styles.imgBanner} />
        </View>
        <View style={styles.ctnText}>
          <Text style={styles.txtTitle}>
            {'Daily knowledge to\nmake you smarter'}
          </Text>
        </View>
      </View>
      <View style={styles.btnWrapper}>
        <Button
          type="white-button"
          label="Get started"
          onPress={() => {
            navigate('Register');
          }}
        />
      </View>
    </View>
  );
}

export default connect(states)(WelcomePage);
