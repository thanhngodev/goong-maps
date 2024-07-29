/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin, Table } from "antd";
import "antd/dist/reset.css";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";

const PAGE_SIZE = 10;
const API_URL = "https://6486c596beba6297278f2283.mockapi.io/product";

interface Product {
  id: string;
  name: string;
  price: number;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}?page=${page}&limit=${PAGE_SIZE}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newProducts: Product[] = await response.json();

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Failed to load more products:", error);
    } finally {
      setLoading(false);
    }
  };

  const onScrollTable = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const bottom =
      target.scrollHeight === target.scrollTop + target.clientHeight;

    if (bottom && !loading && hasMore) {
      fetchProducts(currentPage + 1);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const columns: ColumnsType<{ name: string; price: number }> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <div>
      <Table
        onScroll={onScrollTable}
        dataSource={products}
        columns={columns}
        pagination={false}
        scroll={{ y: 400 }}
        footer={() => (loading ? <Spin /> : null)}
        virtual
        rowKey="id"
      />
    </div>
  );
};

export default ProductTable;
