/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../shared/styling';

export default StyleSheet.create({
  ctnRowIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  ctnCard: {
    width: '33.3%',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(16),
    position: 'relative'
  },
  ctnImgItem: {
    width: moderateScale(95),
    height: moderateScale(150),
    resizeMode: 'cover',
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(2),
    overflow: 'hidden'
  },
  ctnIcon: {
    height: moderateScale(25),
    width: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: moderateScale(12),
    top: moderateScale(5),
  },
  ctnIconItem: {
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'contain',
  },
  bgTransparent: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '96%',
    height: '10%',
    borderBottomLeftRadius: moderateScale(12),
    borderBottomRightRadius: moderateScale(12),
    marginHorizontal: moderateScale(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTittle: {
    color: colors.white,
  },
  rowRandomIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {},
  whiteBg: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(15),
    height: moderateScale(20),
    width: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: moderateScale(12),
    top: moderateScale(5),
  },
  ctnIconItemCheklist: {
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'contain',
  },
  ctnLoader:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  ctnRowCard:{
    position: 'relative',
  }
});
