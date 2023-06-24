import React from 'react';
import {TouchableWithoutFeedback, View, Text, Image} from 'react-native';
import IconChecklist from '../../assets/svg/icon_checklist.svg';
import IconChecklistWhite from '../../assets/svg/checklist_white.svg';
import {BACKEND_URL} from '../../shared/static';
import styles from './styles';

const CategoryItem = ({onPress, item, isSelected}) => {
  const isGeneralCategory = item.id === 1;
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={isGeneralCategory}>
      <View style={styles.ctnItemCategory}>
        <View style={styles.checklistContainer}>
          <View
            style={[
              styles.ctnIconIndicator,
              isGeneralCategory ? styles.bgGray : {},
            ]}>
            <View style={styles.ctnIconItem}>
              {isGeneralCategory ? (
                <IconChecklistWhite width="100%" height="100%" />
              ) : isSelected ? (
                <IconChecklist width="100%" height="100%" />
              ) : (
                <IconChecklistWhite width="100%" height="100%" />
              )}
            </View>
          </View>
        </View>
        <View style={styles.ctnText}>
          <Text style={styles.txtCategory}>{item.name}</Text>
        </View>
        <View style={styles.ctnIconCategory}>
          <Image
            source={{uri: `${BACKEND_URL}${item.icon.url}`}}
            style={styles.imgIconStyle}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CategoryItem;
