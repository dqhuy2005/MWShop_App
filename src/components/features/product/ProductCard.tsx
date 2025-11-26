import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants/colors";
import theme from "../../../styles/theme";
import { Product } from "../../../types";
import { formatCurrency, formatNumber } from "../../../utils/formatters";

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
}

const ProductCard = React.memo(({ product, onPress }: ProductCardProps) => {
  const handlePress = () => {
    onPress?.(product);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.7}
    >
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
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          {product.views ? (
            <Text style={styles.soldCount}>
              Đã bán {formatNumber(product.views)}+
            </Text>
          ) : null}
        </View>

        {product.category && (
          <View style={styles.footer}>
            <Text style={styles.location}>{product.category.name}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
    marginHorizontal: theme.spacing.xs,
    overflow: "hidden",
    ...theme.shadows.sm,
    flex: 1,
    maxWidth: "48%",
  },
  imageContainer: {
    width: "100%",
    height: 150,
    backgroundColor: COLORS.backgroundDark,
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
    padding: theme.spacing.sm,
    flex: 1,
  },
  hotTag: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.hotTag,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: COLORS.hotTagBorder,
  },
  hotTagText: {
    color: COLORS.hotTagText,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: '600',
  },
  productName: {
    fontSize: theme.typography.fontSizes.sm,
    color: COLORS.text,
    lineHeight: 18,
    marginBottom: theme.spacing.sm,
    height: 36,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  price: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  soldCount: {
    fontSize: theme.typography.fontSizes.sm,
    color: COLORS.textSecondary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: theme.spacing.xs,
  },
  location: {
    fontSize: theme.typography.fontSizes.xs,
    color: COLORS.textSecondary,
  },
});
