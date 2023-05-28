import React from 'react';
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import CardTheme from '../../../components/card-theme';
import styles from './styles';
import IconClose from '../../../assets/svg/icon_close.svg';
import {sizing} from '../../../shared/styling';
import LineGestureSlide from '../../../components/line-gesture-slide';

export default function ModalTheme(props) {
  const {contentRef, onClose} = props;

  function renderIconClose() {
    return (
      <TouchableOpacity style={styles.btnStyle} onPress={onClose}>
        <View style={styles.btnClose}>
          <IconClose width="100%" height="100%" />
        </View>
      </TouchableOpacity>
    );
  }

  function renderHeader() {
    return (
      <View style={styles.rowHeaderText}>
        <Text style={styles.boldHeader}>Themes</Text>
        {renderIconClose()}
      </View>
    );
  }

  return (
    <SlidingUpPanel
      ref={contentRef}
      animatedValue={new Animated.Value(0)}
      height={sizing.getDimensionHeight(1)}
      snappingPoints={[0, 0]}
      draggableRange={{
        top: sizing.getDimensionHeight(1),
        bottom: 0,
      }}>
      {dragHandler => (
        <View style={styles.ctnRoot}>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.ctnClose} />
          </TouchableWithoutFeedback>
          <View style={styles.ctnContent}>
            <LineGestureSlide dragHandler={dragHandler} />
            <View {...dragHandler}>{renderHeader()}</View>
            <ScrollView
              contentContainerStyle={styles.ctnListTheme}
              showsVerticalScrollIndicator={false}>
              <CardTheme onClose={onClose} />
            </ScrollView>
          </View>
        </View>
      )}
    </SlidingUpPanel>
  );
}
