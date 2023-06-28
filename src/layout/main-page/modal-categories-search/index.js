<<<<<<< HEAD
import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
=======
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
>>>>>>> 4e965b142c7a73a7605f7e70ce10a84e11abdabc
import PropTypes from 'prop-types';
import {Modal, Portal} from 'react-native-paper';
import {connect} from 'react-redux';
import Search from '../../../components/search';
import styles from './styles';
<<<<<<< HEAD
import CardCategories from '../../../components/card-categories';
import {getListGroup} from '../../../shared/request';
import useDebounce from '../../../helpers/useDebounce';
import {
  handleBasicPaywall,
  handlePayment,
  isUserPremium,
} from '../../../helpers/user';
import LoadingIndicator from '../../../components/loading-indicator';
import states from './states';

const iconClose = require('../../../assets/icons/close.png');

function ModalCategoriesSearch({isVisible, onClose, userProfile}) {
  const [listCategories, setCategories] = useState([]);
  const [isAutoFocus, setAutoFocus] = useState(false);
=======
import {getListCategory, updateCategory} from '../../../shared/request';
import useDebounce from '../../../helpers/useDebounce';
import {
  handleBasicPaywall,
  isUserPremium,
  reloadUserProfile,
} from '../../../helpers/user';
import LoadingIndicator from '../../../components/loading-indicator';
import states from './states';
import CategoryItem from '../../../components/category-item';

const iconClose = require('../../../assets/icons/close.png');

const emptyImage = require('../../../assets/icons/not_found.png');

function ModalCategoriesSearch({
  isVisible,
  onClose,
  selectedCategory,
  categories,
}) {
  const [listCategories, setCategories] = useState([]);
  const [isAutoFocus, setAutoFocus] = useState(false);
  const [categoryValue, setCategoryValue] = useState([]);
  const [alternativeCategory, setAlternativeCategory] = useState([]);
  const debounceReloadCategory = useDebounce(categoryValue, 1000);

>>>>>>> 4e965b142c7a73a7605f7e70ce10a84e11abdabc
  const [isLoading, setLoader] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const debounceSearch = useDebounce(searchText, 500);

  useState(() => {
    setTimeout(() => {
      setAutoFocus(true);
<<<<<<< HEAD
=======
      setCategoryValue(selectedCategory);
>>>>>>> 4e965b142c7a73a7605f7e70ce10a84e11abdabc
    }, 1000);
  }, []);

  useEffect(() => {
<<<<<<< HEAD
=======
    // reloadUserProfile();
  }, [debounceReloadCategory]);

  useEffect(() => {
>>>>>>> 4e965b142c7a73a7605f7e70ce10a84e11abdabc
    if (debounceSearch) {
      const handleSearch = async () => {
        const params = {
          search: debounceSearch,
        };
<<<<<<< HEAD
        const res = await getListGroup(params);
        setCategories(res.data);
=======
        const res = await getListCategory(params);
        setCategories(res.data?.category || []);
        setAlternativeCategory(res.data?.alternative || []);
>>>>>>> 4e965b142c7a73a7605f7e70ce10a84e11abdabc
        setLoader(false);
      };
      handleSearch();
    }
    if (debounceSearch === '') {
      setCategories([]);
      setLoader(false);
    }
  }, [debounceSearch]);

<<<<<<< HEAD
  const getInitialCategory = useCallback(() => {
    if (userProfile?.data?.categories?.length > 0) {
      return userProfile.data.categories.map(item => item.id);
    }
    return [];
  }, [userProfile?.data?.categories]);

=======
>>>>>>> 4e965b142c7a73a7605f7e70ce10a84e11abdabc
  const handleClose = () => {
    setAutoFocus(false);
    if (typeof onClose === 'function') onClose();
  };

  function renderIconClose() {
    return (
      <TouchableOpacity style={styles.btnStyle} onPress={handleClose}>
        <Image source={iconClose} style={styles.btnClose} />
      </TouchableOpacity>
    );
  }

  function renderHeader() {
    return (
      <View style={styles.ctnHeader}>
        <View style={styles.rowHeaderText}>
          {renderIconClose()}
          <Search
            value={searchText}
            onChangeText={value => {
              setLoader(true);
              setSearchText(value);
            }}
            placeholder="Search"
            ctnRootStyle={styles.ctnSearch}
            autoFocus
          />
          {!isUserPremium() && (
            <TouchableOpacity
              style={styles.ctnJustifyEnd}
              onPress={handleBasicPaywall}>
              <Text style={styles.txtHeaderBtn}>Unlock all</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

<<<<<<< HEAD
=======
  const isDataSelected = value => {
    const findItem = categoryValue.find(item => item === value);
    if (findItem) return true;
    return false;
  };

  const handleSelectCategory = async (id, isHasSelect) => {
    let curentCategory = [...categoryValue];
    if (isHasSelect) {
      curentCategory = curentCategory.filter(cat => cat !== id);
    } else {
      curentCategory.push(id);
    }
    setCategoryValue(curentCategory);
    updateCategory({
      categories: curentCategory,
      _method: 'PATCH',
    });
  };

  const renderListCategory = ({item, index}) => {
    const isSelected = isDataSelected(item.id);
    return (
      <CategoryItem
        onPress={() => {
          handleSelectCategory(item.id, isSelected);
        }}
        isSelected={isSelected}
        item={item}
      />
    );
  };

  function renderListEmpty() {
    if (!isLoading && !!searchText === true) {
      return (
        <View style={styles.ctnEmpty}>
          <Image source={emptyImage} style={styles.emptyBanner} />
          <View style={styles.ctnTextDream}>
            <Text style={styles.txtDream}>
              {`No categories found for that\nsearch term.`}
            </Text>
          </View>
          <View style={styles.ctnAlt}>
            <Text style={styles.txtAlt}>
              Try one of our other categories now:
            </Text>
          </View>
          {alternativeCategory &&
            alternativeCategory?.length > 0 &&
            alternativeCategory.map((item, index) => (
              <Fragment key={item.id}>{renderListCategory({item})}</Fragment>
            ))}
        </View>
      );
    }
    return null;
  }

>>>>>>> 4e965b142c7a73a7605f7e70ce10a84e11abdabc
  return (
    <Portal>
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent
        contentContainerStyle={{flex: 1}}
        onDismiss={handleClose}>
        <View style={styles.ctnRoot}>
          <View style={styles.ctnContent}>
<<<<<<< HEAD
            {renderHeader()}
            <ScrollView
              contentContainerStyle={styles.ctnScroll}
              style={styles.ctnRoot}>
              <CardCategories
                buttonLabel="Go Premium"
                hidePopular
                hidePremium
                isSearch
                listData={listCategories}
                initialSelect={getInitialCategory}
                additionalContent={isLoading ? <LoadingIndicator /> : null}
              />
            </ScrollView>
=======
            <FlatList
              style={styles.ctnRoot}
              contentContainerStyle={styles.ctnScroll}
              data={listCategories || []}
              ListHeaderComponent={renderHeader()}
              renderItem={renderListCategory}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={renderListEmpty()}
              ListFooterComponent={isLoading ? <LoadingIndicator /> : null}
            />
>>>>>>> 4e965b142c7a73a7605f7e70ce10a84e11abdabc
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

ModalCategoriesSearch.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalCategoriesSearch.defaultProps = {};

export default connect(states)(ModalCategoriesSearch);
