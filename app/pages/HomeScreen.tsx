import { API_URL } from "@env";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Product } from "../../interfaces";
import ProductCard from "../components/ProductCard";

const getApiUrl = (page: number, perPage: number) => {
  if (API_URL) {
    return `${API_URL}/home?page=${page}&per_page=${perPage}`;
  }
  return null;
};

export default function HomeScreen() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const PER_PAGE = 25;
  const isFetchingRef = useRef(false);
  const lastPageLoadedRef = useRef(0);

  const fetchData = useCallback(
    async (page: number, isLoadMore: boolean = false) => {
      if (isFetchingRef.current) {
        return;
      }

      if (isLoadMore && lastPageLoadedRef.current >= page) {
        console.log(
          `Page ${page} already loaded (last loaded: ${lastPageLoadedRef.current})`
        );
        return;
      }

      try {
        isFetchingRef.current = true;

        if (isLoadMore) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        const apiUrl = getApiUrl(page, PER_PAGE);
        console.log(`📡 Fetching page ${page}: ${apiUrl}`);

        const response = await axios.get(apiUrl!);

        // Parse response if it's a string
        let responseData;
        if (typeof response.data === "string") {
          responseData = JSON.parse(response.data);
        } else {
          responseData = response.data;
        }

        const products = responseData?.data?.products || [];
        const hasMoreData = responseData?.data?.has_more ?? false;
        const totalProducts = responseData?.data?.total_products || 0;
        const currentPageNum = responseData?.data?.current_page || page;
        const lastPage = responseData?.data?.last_page || 0;
        const nextPage = responseData?.data?.next_page;

        console.log(`📊 Page ${page} Details:`, {
          productsReceived: products.length,
          hasMore: hasMoreData,
          currentPage: currentPageNum,
          lastPage: lastPage,
          nextPage: nextPage,
          totalProducts: totalProducts,
          productsArrayEmpty: products.length === 0,
        });

        console.log(
          `✅ Page ${page} loaded: ${products.length} products, Has more: ${hasMoreData}`
        );

        if (isLoadMore) {
          setData((prevData) => {
            const existingIds = new Set(prevData.map((p: Product) => p.id));
            const newProducts = products.filter(
              (p: Product) => !existingIds.has(p.id)
            );
            return [...prevData, ...newProducts];
          });
        } else {
          setData(products);
          console.log(`   → Initial load: ${products.length} products`);
        }

        setHasMore(hasMoreData);
        setCurrentPage(page);
        lastPageLoadedRef.current = page;
        setError(null);
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.message || err.message || "Failed to fetch data";
        setError(errorMsg);
      } finally {
        isFetchingRef.current = false;
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [PER_PAGE]
  );

  useEffect(() => {
    fetchData(1, false);
  }, [fetchData]);

  const renderProductItem = useCallback(
    ({ item }: { item: Product }) => <ProductCard product={item} />,
    []
  );

  const keyExtractor = useCallback(
    (item: Product, index: number) => `${item.id}-${index}`,
    []
  );

  const handleLoadMore = useCallback(() => {
    console.log(
      `🔄 handleLoadMore called - hasMore: ${hasMore}, currentPage: ${currentPage}`
    );

    if (!hasMore) {
      console.log("⛔ No more pages to load");
      return;
    }

    const nextPage = currentPage + 1;
    console.log(`⬇️ === Load More Triggered === Loading page: ${nextPage}`);
    fetchData(nextPage, true);
  }, [hasMore, currentPage, fetchData]);

  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#ee4d2d" />
        <Text style={styles.footerText}>Đang tải thêm sản phẩm...</Text>
      </View>
    );
  }, [loadingMore]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>
              <Ionicons name="search" size={16} />
            </Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm sản phẩm..."
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Text style={styles.cameraIcon}>
                <Ionicons name="camera" size={25} />
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartIcon}>
              <Ionicons name="cart" size={24} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ee4d2d" />
          <Text style={styles.loadingText}>Đang tải sản phẩm...</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderProductItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.8}
          ListFooterComponent={renderFooter}
          removeClippedSubviews={true}
          maxToRenderPerBatch={6}
          updateCellsBatchingPeriod={100}
          initialNumToRender={8}
          windowSize={5}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#1e3a8a",
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 12,
    zIndex: 1000,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  cameraButton: {
    padding: 4,
  },
  cameraIcon: {
    fontSize: 18,
  },
  cartButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  cartIcon: {
    fontSize: 24,
  },
  messageButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  messageIcon: {
    fontSize: 24,
  },
  listContent: {
    padding: 4,
  },
  row: {
    justifyContent: "flex-start",
    gap: 0,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  errorCard: {
    backgroundColor: "#fff3cd",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  errorText: {
    fontSize: 13,
    color: "#856404",
  },
  footerLoader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
  footerText: {
    fontSize: 13,
    color: "#666",
  },
});
