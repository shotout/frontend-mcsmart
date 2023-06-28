import React, {useState} from 'react';
import {Image, TextInput, View, Text} from 'react-native';
import {colors} from '../../shared/styling';
import styles from './styles';

<<<<<<< HEAD
const iconSearch = require('../../assets/icons/search.png');
=======
const iconSearch = require('../../assets/icons/search_black.png');
>>>>>>> 4e965b142c7a73a7605f7e70ce10a84e11abdabc

export default function Search(props) {
  const {ctnRootStyle, ctnInputStyle, isSelect} = props;

  if (isSelect) {
    return (
      <View style={[styles.mainWrapper, ctnRootStyle]}>
        <View style={[styles.ctnInput, ctnInputStyle]}>
          <View style={styles.ctnRow}>
            <Text style={styles.inputStyle}>{props.placeholder || ''}</Text>
            <Image style={styles.searchIcon} source={iconSearch} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.mainWrapper, ctnRootStyle]}>
      <View style={[styles.ctnInput, ctnInputStyle]}>
        <View style={styles.ctnRow}>
          <TextInput
            style={styles.inputStyle}
<<<<<<< HEAD
            placeholderTextColor={colors.blue}
=======
            placeholderTextColor={colors.black}
>>>>>>> 4e965b142c7a73a7605f7e70ce10a84e11abdabc
            {...props}
          />
          <Image style={styles.searchIcon} source={iconSearch} />
        </View>
      </View>
    </View>
  );
}
