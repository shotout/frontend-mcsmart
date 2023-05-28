import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../shared/devices';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ctnFreeBadge: {
    position: 'absolute',
    top: isIphoneXorAbove() ? moderateScale(60) : moderateScale(30),
    right: moderateScale(20),
    height: moderateScale(40),
    backgroundColor: 'rgba(0, 0, 0,0.8)',
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  txtFreeBadge: {
    color: colors.white,
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
  },
  ctnIconCrown: {
    width: moderateScale(26),
    height: moderateScale(26),
    marginLeft: moderateScale(6),
    resizeMode: 'contain',
  },
  btnWrapper: {
    paddingBottom: isIphoneXorAbove() ? moderateScale(20) : 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  subBottomWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctnRounded: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50 / 2),
    padding: moderateScale(12),
    marginHorizontal: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
  },
  rowLef: {
    width: moderateScale(110),
  },
  btnCategories: {
    paddingHorizontal: moderateScale(8),
    marginLeft: moderateScale(0),
    marginRight: moderateScale(0),
    width: '100%',
  },
  ctnIconCategories: {
    width: moderateScale(18),
    height: moderateScale(18),
    marginRight: moderateScale(8),
  },
  txtCategory: {
    fontSize: moderateScale(13),
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    width: moderateScale(113),
    // backgroundColor: 'red'
  },
  btnRight: {
    width: moderateScale(48),
    height: moderateScale(48),
    marginRight: 0,
    borderRadius: moderateScale(10),
    marginLeft: 0,
  },
  mgLeft: {
    marginLeft: moderateScale(12),
  },
  ctnTutorial: {
    position: 'absolute',
    width: '100%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnRound: {
    width: moderateScale(300),
    height: moderateScale(300),
    borderRadius: moderateScale(300 / 2),
    backgroundColor: 'rgba(0,0,0,0.96)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnIconTutorial: {
    width: moderateScale(110),
    height: moderateScale(110),
  },
  txtTutorial: {
    fontFamily: fonts.InterMedium,
    color: colors.white,
    textAlign: 'center',
    fontSize: moderateScale(18),
    marginTop: moderateScale(12),
  },
  txtDescTutorial: {
    fontFamily: fonts.InterMedium,
    color: colors.white,
    textAlign: 'center',
    fontSize: moderateScale(14),
    marginTop: moderateScale(12),
  },
  ctnCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
