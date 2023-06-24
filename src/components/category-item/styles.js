import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnItemCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.yellow,
    marginBottom: moderateScale(20),
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(20),
    paddingHorizontal: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    paddingVertical: moderateScale(12),
  },
  checklistContainer: {
    width: moderateScale(35),
  },
  ctnIconItem: {
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'contain',
  },
  ctnIconIndicator: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(15),
    height: moderateScale(25),
    width: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctnText: {
    flex: 1,
  },
  txtCategory: {
    color: colors.black,
    fontSize: moderateScale(16),
    fontFamily: fonts.InterMedium,
    textAlign: 'center',
  },
  ctnIconCategory: {
    width: moderateScale(35),
  },
  imgIconStyle: {
    width: moderateScale(35),
    height: moderateScale(35),
    resizeMode: 'contain',
  },
  bgGray: {
    backgroundColor: colors.gray,
  },
});
