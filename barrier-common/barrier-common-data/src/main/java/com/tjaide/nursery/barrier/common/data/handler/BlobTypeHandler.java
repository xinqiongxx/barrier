package com.tjaide.nursery.barrier.common.data.handler;

import lombok.SneakyThrows;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;

import java.io.ByteArrayInputStream;
import java.sql.*;

@MappedJdbcTypes(JdbcType.BLOB)
@MappedTypes(value = String.class)
public class BlobTypeHandler extends BaseTypeHandler<String> {

    @Override
    @SneakyThrows
    public void setNonNullParameter(PreparedStatement preparedStatement, int i, String s, JdbcType jdbcType) throws SQLException {
        ByteArrayInputStream bis;
        bis = new ByteArrayInputStream(s.getBytes("UTF-8"));
        preparedStatement.setBinaryStream(i, bis, s.length());
    }

    @Override
    @SneakyThrows
    public String getNullableResult(ResultSet resultSet, String s) throws SQLException {
        Blob blob = (Blob) resultSet.getBlob(s);
        byte[] returnValue = null;
        if (null != blob) {
            returnValue = blob.getBytes(1, (int) blob.length());
        }
        return new String(returnValue, "UTF-8");
    }

    @Override
    @SneakyThrows
    public String getNullableResult(ResultSet resultSet, int i) throws SQLException {
        Blob blob = (Blob) resultSet.getBlob(i);
        byte[] returnValue = null;
        if (null != blob) {
            returnValue = blob.getBytes(1, (int) blob.length());
        }
        return new String(returnValue, "UTF-8");
    }

    @Override
    @SneakyThrows
    public String getNullableResult(CallableStatement callableStatement, int i) throws SQLException {
        Blob blob = (Blob) callableStatement.getBlob(i);
        byte[] returnValue = null;
        if (null != blob) {
            returnValue = blob.getBytes(1, (int) blob.length());
        }
        return new String(returnValue, "UTF-8");
    }
}