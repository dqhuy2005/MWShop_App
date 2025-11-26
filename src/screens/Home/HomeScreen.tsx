/**
 * Home Screen
 * Main product listing screen with infinite scroll
 */

import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { productService } from '../../api/services';
import { ProductCard } from '../../components';
import { COLORS, STRINGS } from '../../constants';
import { usePagination } from '../../hooks';
import theme from '../../styles/theme';
import { Product } from '../../types';

const HomeScreen = () => {
  // Use pagination hook for products
  const {
    data: products,
    loading,
    loadingMore,
    error,
    hasMore,
    fetchData,
    loadMore,
  } = usePagination<Product>(productService.getProducts, { perPage: 25 });

  // Initial data fetch
  useEffect(() => {
    fetchData(1, false);
  }, []);

  // Render single product item
  const renderProductItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard 
        product={item} 
        onPress={(product) => {
          console.log('Product pressed:', product.id);
          // Navigate to product detail
        }}
      />
    ),
    []
  );

  // Key extractor
  const keyExtractor = useCallback(
    (item: Product, index: number) => `${item.id}-${index}`,
    []
  );

  // Handle end reached (load more)
  const handleEndReached = useCallback(() => {
    if (hasMore && !loadingMore) {
      loadMore();
    }
  }, [hasMore, loadingMore, loadMore]);

  // Render footer (loading indicator)
  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={COLORS.secondary} />
        <Text style={styles.footerText}>
          {STRINGS.home.loadingMore}
        </Text>
      </View>
    );
  }, [loadingMore]);

  // Render empty component
  const renderEmpty = useCallback(() => {
    if (loading) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {STRINGS.home.noProducts}
        </Text>
      </View>
    );
  }, [loading]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons 
              name="search" 
              size={16} 
              color={COLORS.textSecondary}
            />
            <TextInput
              style={styles.searchInput}
              placeholder={STRINGS.home.searchPlaceholder}
              placeholderTextColor={COLORS.textTertiary}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons 
                name="camera" 
                size={24} 
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons 
              name="cart" 
              size={24} 
              color={COLORS.surface}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.secondary} />
          <Text style={styles.loadingText}>
            {STRINGS.home.loading}
          </Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => fetchData(1, false)}
          >
            <Text style={styles.retryButtonText}>
              {STRINGS.common.retry}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.8}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          removeClippedSubviews={true}
          maxToRenderPerBatch={6}
          updateCellsBatchingPeriod={100}
          initialNumToRender={8}
          windowSize={5}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 40,
    paddingBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    zIndex: 1000,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.md,
    height: 40,
    gap: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.fontSizes.md,
    color: COLORS.text,
  },
  cameraButton: {
    padding: theme.spacing.xs,
  },
  cartButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: theme.spacing.xs,
  },
  row: {
    justifyContent: 'flex-start',
    gap: 0,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxxl,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSizes.md,
    color: COLORS.textSecondary,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxxl,
  },
  errorText: {
    fontSize: theme.typography.fontSizes.md,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
  retryButtonText: {
    color: COLORS.surface,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.semiBold,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxxl,
  },
  emptyText: {
    fontSize: theme.typography.fontSizes.md,
    color: COLORS.textSecondary,
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  footerText: {
    fontSize: theme.typography.fontSizes.sm,
    color: COLORS.textSecondary,
  },
});
