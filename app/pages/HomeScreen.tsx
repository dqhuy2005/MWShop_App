import { API_URL } from "@env";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ApiResponse, Product } from "../../interfaces";

const getApiUrl = () => {
  if (API_URL) {
    return API_URL;
  }
  return null;
};

export default function HomeScreen() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiUrl = getApiUrl();

        const response = await axios.get<ApiResponse>(apiUrl!, {
          timeout: 10000,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const products = response.data?.data?.products || [];
        const total = response.data?.data?.total_products || 0;

        setData(products);
        setTotalProducts(total);
        setError(null);

        console.log("Loaded products:", products.length);
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.message || err.message || "Failed to fetch data";
        setError(errorMsg);
        console.error("API Error:", err);
        console.error("API URL:", getApiUrl());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <View style={styles.productHeader}>
        <Text style={styles.productName}>{item.name}</Text>
        {item.is_hot && (
          <View style={styles.hotBadge}>
            <Text style={styles.hotBadgeText}>🔥 HOT</Text>
          </View>
        )}
      </View>

      <Text style={styles.productPrice}>
        {item.price.toLocaleString("vi-VN")} {item.currency}
      </Text>

      {item.category && (
        <Text style={styles.productCategory}>📁 {item.category.name}</Text>
      )}

      {item.description && (
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
      )}

      <View style={styles.productFooter}>
        <Text style={styles.productViews}>👁️ {item.views} views</Text>
        <Text
          style={[
            styles.productStatus,
            item.status ? styles.statusActive : styles.statusInactive,
          ]}
        >
          {item.status ? "✓ Available" : "✗ Unavailable"}
        </Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <>
      <Text style={styles.title}>Product List</Text>

      {error && (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>⚠️ Network Error</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorHint}>API URL: {getApiUrl()}</Text>
          <Text style={styles.errorHint}>Platform: {Platform.OS}</Text>
          <Text style={styles.errorHint}>
            • For Android Emulator: Use 10.0.2.2 instead of localhost
          </Text>
          <Text style={styles.errorHint}>
            • Make sure backend server is running on port 8000
          </Text>
          <Text style={styles.errorHint}>
            • Check if CORS is enabled on your backend
          </Text>
        </View>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      )}

      {!loading && !error && data.length === 0 && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No products found</Text>
        </View>
      )}

      {!loading && !error && data.length > 0 && (
        <Text style={styles.productsCount}>
          Showing {data.length} of {totalProducts} total products
        </Text>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 40,
    color: "#333",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#666",
  },
  productsCount: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    fontStyle: "italic",
  },
  productItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  hotBadge: {
    backgroundColor: "#ff5722",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  hotBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#007AFF",
    marginBottom: 6,
  },
  productCategory: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 10,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  productViews: {
    fontSize: 12,
    color: "#999",
  },
  productStatus: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusActive: {
    color: "#4caf50",
  },
  statusInactive: {
    color: "#f44336",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorCard: {
    backgroundColor: "#ffebee",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ef5350",
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#c62828",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#d32f2f",
    marginBottom: 8,
  },
  errorHint: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  emptyCard: {
    backgroundColor: "#f5f5f5",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});
