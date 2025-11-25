import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Product } from "../../interfaces";

interface ProductCardProps {
  product: Product;
}

const ProductCard = React.memo(({ product }: ProductCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>📦</Text>
        </View>
      </View>

      <View style={styles.content}>
        {product.is_hot && (
          <View style={styles.hotTag}>
            <Text style={styles.hotTagText}>🔥 Đang bán chạy</Text>
          </View>
        )}

        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {product.price.toLocaleString("vi-VN")}₫
          </Text>
          <Text style={styles.soldCount}>Đã bán {product.views}+</Text>
        </View>

        <View style={styles.footer}>
          {product.category && (
            <Text style={styles.location}>{product.category.name}</Text>
          )}
        </View>
      </View>
    </View>
  );
});

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 4,
    marginBottom: 8,
    marginHorizontal: 4,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flex: 1,
    maxWidth: '48%',
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#ff5722",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 10,
  },
  discountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  imageContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#f0f0f0",
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
  },
  imagePlaceholderText: {
    fontSize: 48,
  },
  content: {
    padding: 8,
    flex: 1,
  },
  hotTag: {
    alignSelf: "flex-start",
    backgroundColor: "#fff3e0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ff9800",
  },
  hotTagText: {
    color: "#e65100",
    fontSize: 11,
    fontWeight: "600",
  },
  productName: {
    fontSize: 13,
    color: "#333",
    lineHeight: 18,
    marginBottom: 8,
    height: 36,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ee4d2d",
  },
  soldCount: {
    fontSize: 12,
    color: "#757575",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 4,
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  deliveryIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  deliveryText: {
    fontSize: 11,
    color: "#26aa99",
  },
  location: {
    fontSize: 11,
    color: "#757575",
  },
});
