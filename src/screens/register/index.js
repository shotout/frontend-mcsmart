import React, {useState} from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import notifee from '@notifee/react-native';
import DeviceInfo from 'react-native-device-info';

import Lottie from 'lottie-react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {createAnimatableComponent} from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/button';
import styles from './styles';
import states from './states';
import dispatcher from './dispatcher';
import {openPrivacyPolicy, openTermsofUse} from '../../helpers/user';
import LoadingIndicator from '../../components/loading-indicator';
import {isIphoneXorAbove} from '../../shared/devices';

import HeaderStep from '../../layout/register/header-step';
import ContentName from '../../layout/register/content-step-1';
import ContentGender from '../../layout/register/content-step-2';
import ContentNotification from '../../layout/register/content-step-3';
// import ContentStep5 from '../../layout/register/content-step-5';
// import ContentStep6 from '../../layout/register/content-step-6';
import ContentImpress from '../../layout/register/content-step-7';
import ContentTopic from '../../layout/register/content-topic';
// import ChangeLife from '../../layout/register/change-life';
import ChooseCommitment from '../../layout/register/choose-commitment';
import Contract from '../../layout/register/contract';
import {listTopic} from '../../shared/staticData';
import {reset} from '../../shared/navigationRef';

const Convetti = require('../../assets/lottie/hello.json');

const AnimateAbleTouch = createAnimatableComponent(View);

function Register({defaultData}) {
  const isIpad = DeviceInfo.getSystemName() === 'iPadOS' || Platform.isPad;
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [registerStep, setRegisterStep] = useState(1);
  const [substep, setSubstep] = useState('a');
  const [notificationStep, setNotificationStep] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [mutateForm, setMutateForm] = useState({
    style: 1,
    fcm_token: null,
    purchasely_id: null,
    device_id: null,
  });
  const [values, setFormValues] = useState({
    name: '',
    gender: '',
    start_at: moment(new Date(2018, 11, 24, 8, 0, 30, 0)).format(
      'YYYY-MM-DD HH:mm',
    ),
    end_at: moment(new Date(2018, 11, 24, 21, 0, 30, 0)).format(
      'YYYY-MM-DD HH:mm',
    ),
    often: 10,
    selectedFeeling: [],
    causeFeeling: [],
    selectedCategory: [],
    // selectedCategory: defaultData.areas,
    isAnytime: null,
    specific_goal: null,
    important_change: null,
    commit_goal: '12',
    is_impress: null,
  });

  function getStatusDisable() {
    if (registerStep === 5 && !values.commit_goal) {
      return true;
    }
    if (registerStep === 1) {
      if (substep === 'b') {
        return false;
      }
      if (!values.name) {
        return true;
      }
    }
    if (registerStep === 4 && !values.selectedCategory.length) {
      return true;
    }
    return false;
  }

  function getLabelDarkButton() {
    if (registerStep === 6) {
      if (notificationStep === 2) {
        return 'Ok, let’s do it!';
      }
      if (notificationStep === 3 || notificationStep === 4) {
        return 'Got it!';
      }
    }
    // if (registerStep === 4) {
    //   return 'Got it!';
    // }
    return 'Continue';
  }

  function getLabelSkip() {
    if (registerStep === 6) {
      if (notificationStep === 2) {
        return 'I’m not ready yet';
      }
      return 'I want Facts at any time';
    }
    if (registerStep === 4) {
      return 'I want to know everything';
    }
    return 'Skip for now';
  }

  const nextStepAnimate = () => {
    setTimeout(() => {
      setSubstep('b');
    }, 2300);
  };

  const handleContinueStep = async () => {
    if (registerStep === 1) {
      if (substep === 'a') {
        setSubstep('b');
        Keyboard.dismiss();
      } else {
        setRegisterStep(registerStep + 1);
        setSubstep('a');
      }
    } else if (registerStep === 6) {
      // FOR WIDGET  CONDITION
      if (notificationStep === 4) {
        setRegisterStep(7);
        setSubstep('a');
        nextStepAnimate();
      } else if (notificationStep === 3) {
        setNotificationStep(4);
      } else if (notificationStep === 2) {
        const settings = await notifee.requestPermission();
        setNotificationStep(3);
      } else {
        setNotificationStep(2);
      }
      // if (notificationStep === 2) {
      //   const settings = await notifee.requestPermission();
      //   setRegisterStep(8);
      //   setSubstep('a');
      //   nextStepAnimate();
      // } else {
      //   setNotificationStep(2);
      // }
    } else if (registerStep === 5) {
      setRegisterStep(registerStep + 1);
      setSubstep('a');
    } else if (registerStep === 6) {
      if (substep === 'a') {
        if (!values.selectedFeeling.length) {
          setRegisterStep(7);
        } else {
          setSubstep('b');
        }
      } else {
        setRegisterStep(7);
      }
    } else if (registerStep === 7) {
      reset('MainPage');
      AsyncStorage.setItem('isLogin', 'yes');
    } else {
      setRegisterStep(registerStep + 1);
      setSubstep('a');
    }
  };

  const handleChangeValue = (stateName, value) => {
    setFormValues({
      ...values,
      [stateName]: value,
    });
    if (stateName === 'gender') {
      setTimeout(() => {
        setRegisterStep(registerStep + 1);
      }, 300);
    }
  };

  const handleSkipBtn = async () => {
    if (registerStep === 1) {
      if (substep === 'a') {
        setSubstep('b');
        Keyboard.dismiss();
      } else {
        setRegisterStep(registerStep + 1);
        setSubstep('a');
      }
    } else if (registerStep === 6) {
      handleChangeValue('isAnytime', 1);

      // FOR WIDGET  CONDITION
      if (notificationStep === 4) {
        setRegisterStep(7);
        setSubstep('a');
        nextStepAnimate();
      } else if (notificationStep === 3) {
        setNotificationStep(4);
      } else if (notificationStep === 2) {
        setNotificationStep(3);
      } else {
        setNotificationStep(2);
      }
    } else if (registerStep === 4) {
      setRegisterStep(registerStep + 1);
      // handleChangeValue(
      //   'selectedCategory',
      //   defaultData.areas.map(item => item.id),
      // );
    } else {
      setRegisterStep(registerStep + 1);
      setSubstep('a');
    }
  };

  console.log('Check registerStep:', registerStep);

  function renderContent() {
    if (registerStep === 8) {
      return <LoadingIndicator fullscreen />;
    }

    if (registerStep === 7) {
      return (
        <Contract
          values={values}
          substep={substep}
          listCategory={listTopic}
          onLongPress={handleContinueStep}
        />
      );
    }
    if (registerStep === 6) {
      return (
        <ContentNotification
          values={values}
          contentStep={notificationStep}
          handleChangeValue={handleChangeValue}
        />
      );
    }
    if (registerStep === 5) {
      return (
        <ChooseCommitment
          onPress={value => {
            handleChangeValue('commit_goal', value);
          }}
          commit_goal={values.commit_goal}
        />
      );
    }
    if (registerStep === 4) {
      return (
        <ContentTopic
          name={values.name}
          initialCategory={values.selectedCategory}
          onSelect={value => {
            handleChangeValue('selectedCategory', value);
          }}
        />
      );
    }
    if (registerStep === 3) {
      return (
        <ContentImpress
          name={values.name}
          substep={substep}
          onPressGoals={value => {
            if (substep === 'a') {
              setSubstep('b');
            }
            if (substep === 'b') {
              setSubstep('c');
            }
            if (substep === 'c') {
              setSubstep('d');
            }
            if (substep === 'd') {
              handleChangeValue('is_impress', value);
              setRegisterStep(registerStep + 1);
            }
          }}
        />
      );
    }
    if (registerStep === 2) {
      return (
        <ContentGender
          name={values.name}
          selectedGender={values.gender}
          handleSelect={handleChangeValue}
        />
      );
    }
    return (
      <ContentName
        keyboardShow={keyboardShow}
        value={values.name}
        substep={substep}
        onSubmitEditing={handleContinueStep}
        onChangeText={name => {
          setFormValues({
            ...values,
            name,
          });
        }}
      />
    );
  }

  function renderBottomButton() {
    if (registerStep === 8) {
      return (
        <View style={styles.ctnRow}>
          <TouchableOpacity style={styles.btnTerms} onPress={openTermsofUse}>
            <Text style={styles.txtTerms}>Terms & Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnTerms} onPress={openPrivacyPolicy}>
            <Text style={styles.txtTerms}>Privacy policy</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (registerStep === 6 && notificationStep === 2) {
      return (
        <TouchableOpacity style={styles.btnSkip} onPress={handleSkipBtn}>
          <Text style={styles.txtSkip}>{getLabelSkip()}</Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

  function renderSkipButton() {
    if (
      registerStep === 3 ||
      registerStep === 5 ||
      (registerStep === 6 && notificationStep !== 1)
    ) {
      return null;
    }
    if (registerStep === 1 && substep === 'b') {
      return null;
    }
    if (registerStep === 8) {
      return (
        <Text style={styles.txtSubscription}>
          3 days free, then just USD 19.99/year
        </Text>
      );
    }
    return (
      <TouchableOpacity style={styles.btnSkip} onPress={handleSkipBtn}>
        <Text style={styles.txtSkip}>{getLabelSkip()}</Text>
      </TouchableOpacity>
    );
  }

  function renderButton(ctnStyle, delayDuration) {
    if (registerStep === 8 || registerStep === 9 || registerStep === 7) {
      return null;
    }
    if (registerStep === 3) {
      return null;
    }
    if (registerStep === 2) {
      return (
        <View style={[styles.btnWrapper, ctnStyle]}>
          <TouchableOpacity
            style={styles.btnSkip}
            onPress={() => {
              handleChangeValue('gender', '');
            }}>
            <Text style={styles.txtSkip}>Prefer not to say</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (registerStep === 1 && substep === 'b') {
      return (
        <AnimateAbleTouch
          animation="fadeIn"
          duration={500}
          delay={delayDuration || 800}
          style={[styles.btnWrapper, ctnStyle]}>
          <Button
            btnStyle={[
              styles.btnContinue,
              notificationStep === 2 && registerStep === 7 && styles.noMgBtm,
            ]}
            type="white-button"
            label={getLabelDarkButton()}
            isDisable={getStatusDisable()}
            onPress={handleContinueStep}
            isLoading={isLoading}
          />
        </AnimateAbleTouch>
      );
    }
    return (
      <View style={[styles.btnWrapper, ctnStyle]}>
        {renderSkipButton()}
        <Button
          btnStyle={[
            styles.btnContinue,
            notificationStep === 2 && registerStep === 7 && styles.noMgBtm,
          ]}
          label={getLabelDarkButton()}
          isDisable={getStatusDisable()}
          onPress={handleContinueStep}
          isLoading={isLoading}
        />
        {renderBottomButton()}
      </View>
    );
  }

  function renderAnimation() {
    if (registerStep === 1 && substep === 'b') {
      return (
        <View style={styles.ctnConvetti}>
          <Lottie
            source={Convetti}
            style={styles.animationStyle}
            autoPlay
            loop={false}
          />
        </View>
      );
    }
    return null;
  }

  function renderHeader() {
    if (registerStep === 1 && substep === 'b') {
      return null;
    }
    if (registerStep === 8 && substep === 'a') {
      return null;
    }
    if (registerStep === 9) {
      return null;
    }
    return <HeaderStep currentStep={registerStep} />;
  }

  return (
    <View style={styles.ctnRoot}>
      {renderAnimation()}
      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <KeyboardAwareScrollView
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="always"
          onKeyboardDidHide={() => {
            setKeyboardShow(false);
          }}
          onKeyboardDidShow={() => {
            setKeyboardShow(true);
          }}
          style={styles.flexOne}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ctnScroll}
          scrollEnabled={
            (!isIphoneXorAbove() && registerStep === 8) ||
            (isIpad && registerStep !== 1)
          }>
          {renderHeader()}
          {renderContent()}
          {registerStep === 1 && substep === 'a'
            ? null
            : renderButton(
                styles.mgBtm40,
                registerStep === 1 && substep === 'b' ? 2500 : null,
              )}
        </KeyboardAwareScrollView>

        {registerStep === 1 && substep === 'a' && renderButton()}
      </KeyboardAvoidingView>
    </View>
  );
}

Register.propTypes = {};

Register.defaultProps = {};

export default connect(states, dispatcher)(Register);
