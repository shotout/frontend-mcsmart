import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
  },
  ctnBanner: {
    position: 'relative',
    paddingTop: moderateScale(0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBanner: {
    width: moderateScale(157),
    height: moderateScale(141),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  inputWrapper: {
    marginBottom: moderateScale(20),
    marginTop: moderateScale(8),
  },
  txtInput: {
    marginHorizontal: moderateScale(20),
    fontFamily: fonts.InterBold,
    color: colors.black,
    textAlign: 'center',
    fontSize: moderateScale(18),
    lineHeight: moderateScale(26),
  },
  txtItem: {
    marginHorizontal: moderateScale(12),
    fontFamily: fonts.InterMedium,
    color: colors.black,
    textAlign: 'center',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(26),
  },
  ctnInput: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(12),
    height: moderateScale(40),
    backgroundColor: colors.lightBlue,
    borderRadius: moderateScale(12),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(8),
  },
  ctnSeparator: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  ctnRadius: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(28 / 2),
    padding: moderateScale(6),
  },
  iconStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  ctnClose: {
    position: 'absolute',
    top: 0,
    left: moderateScale(20),
  },
  icnCloseStyle: {
    width: moderateScale(22),
    height: moderateScale(22),
    resizeMode: 'contain',
  },
});
