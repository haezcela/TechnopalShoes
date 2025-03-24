
package com.laponhcet.mediatype;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;
import com.mytechnopal.ActionResponse;
import com.mytechnopal.base.DAOBase;
import com.mytechnopal.base.DTOBase;

public class MediaTypeDAO extends DAOBase {
    private static final long serialVersionUID = 1L;

    private String qryMediaTypeAdd = "INSERT INTO media_type (code, name, added_by, added_timestamp, updated_by, updated_timestamp) VALUES (?, ?, ?, ?, ?, ?)";
    private String qryMediaTypeUpdate = "UPDATE media_type SET code = ?, name = ?, updated_by = ?, updated_timestamp = ? WHERE id = ?";
    private String qryMediaTypeDelete = "DELETE FROM media_type WHERE id = ?";
    private String qryMediaTypeList = "SELECT * FROM media_type";
    private String qryMediaTypeLast = "SELECT * FROM media_type ORDER BY id DESC LIMIT 1";

    @Override
    public void executeAdd(DTOBase obj) {
        java.sql.Connection conn = null;
        List<java.sql.PreparedStatement> prepStmntList = new ArrayList<>();
        try {
            conn = daoConnectorUtil.getConnection();
            MediaTypeDTO mediaType = (MediaTypeDTO) obj;

            String generatedCode = getGeneratedCode(qryMediaTypeLast, 0);
            mediaType.setCode(generatedCode);

            mediaType.setBaseDataOnInsert();

            add(conn, prepStmntList, mediaType);
            result.put(ActionResponse.SESSION_ACTION_RESPONSE, executeIUD(conn, prepStmntList));
        } finally {
            closeDB(prepStmntList, conn);
        }
    }


private void closeDB(List<java.sql.PreparedStatement> prepStmntList, java.sql.Connection conn) {
    for (java.sql.PreparedStatement prepStmnt : prepStmntList) {
        if (prepStmnt != null) {
            try {
                prepStmnt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    if (conn != null) {
        try {
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}


    public void add(java.sql.Connection conn, List<java.sql.PreparedStatement> prepStmntList, DTOBase obj) {
        MediaTypeDTO mediaType = (MediaTypeDTO) obj;
        PreparedStatement prepStmnt = null;
        try {
            prepStmnt = (PreparedStatement) conn.prepareStatement(qryMediaTypeAdd);
            prepStmnt.setString(1, mediaType.getCode());
            prepStmnt.setString(2, mediaType.getName());
            prepStmnt.setString(3, mediaType.getAddedBy());
            prepStmnt.setTimestamp(4, mediaType.getAddedTimestamp());
            prepStmnt.setString(5, mediaType.getUpdatedBy());
            prepStmnt.setTimestamp(6, mediaType.getUpdatedTimestamp());
        } catch (SQLException e) {
            e.printStackTrace();
        }
        prepStmntList.add(prepStmnt);
    }

    @Override
    public void executeUpdate(DTOBase obj) {
        MediaTypeDTO mediaType = (MediaTypeDTO) obj;
        mediaType.setBaseDataOnUpdate();
        Connection conn = (Connection) daoConnectorUtil.getConnection();
        List<java.sql.PreparedStatement> prepStmntList = new ArrayList<>();
        update(conn, prepStmntList, mediaType);
        result.put(ActionResponse.SESSION_ACTION_RESPONSE, executeIUD(conn, prepStmntList));
    }

    public void update(Connection conn, List<java.sql.PreparedStatement> prepStmntList, DTOBase obj) {
        MediaTypeDTO mediaType = (MediaTypeDTO) obj;
        PreparedStatement prepStmnt = null;
        try {
            prepStmnt = (PreparedStatement) conn.prepareStatement(qryMediaTypeUpdate);
            prepStmnt.setString(1, mediaType.getCode());
            prepStmnt.setString(2, mediaType.getName());
            prepStmnt.setString(3, mediaType.getUpdatedBy());
            prepStmnt.setTimestamp(4, mediaType.getUpdatedTimestamp());
            prepStmnt.setInt(5, mediaType.getId());
        } catch (SQLException e) {
            e.printStackTrace();
        }
        prepStmntList.add(prepStmnt);
    }

    @Override
    public void executeDelete(DTOBase obj) {
        MediaTypeDTO mediaType = (MediaTypeDTO) obj;
        Connection conn = (Connection) daoConnectorUtil.getConnection();
        List<java.sql.PreparedStatement> prepStmntList = new ArrayList<>();
        delete(conn, prepStmntList, mediaType);
        result.put(ActionResponse.SESSION_ACTION_RESPONSE, executeIUD(conn, prepStmntList));
    }

    public void delete(Connection conn, List<java.sql.PreparedStatement> prepStmntList, DTOBase obj) {
        MediaTypeDTO mediaType = (MediaTypeDTO) obj;
        PreparedStatement prepStmnt = null;
        try {
            prepStmnt = (PreparedStatement) conn.prepareStatement(qryMediaTypeDelete);
            prepStmnt.setInt(1, mediaType.getId());
        } catch (SQLException e) {
            e.printStackTrace();
        }
        prepStmntList.add(prepStmnt);
    }

    public List<DTOBase> getList() {
        List<DTOBase> mediaTypeList = new ArrayList<>();
        Connection conn = (Connection) daoConnectorUtil.getConnection();
        try (PreparedStatement pstmt = (PreparedStatement) conn.prepareStatement(qryMediaTypeList);
             ResultSet rs = pstmt.executeQuery()) {
            while (rs.next()) {
                MediaTypeDTO mediaType = new MediaTypeDTO();
                mediaType.setId(rs.getInt("id"));
                mediaType.setCode(rs.getString("code"));
                mediaType.setName(rs.getString("name"));
                mediaType.setAddedBy(rs.getString("added_by"));
                mediaType.setAddedTimestamp(rs.getTimestamp("added_timestamp"));
                mediaType.setUpdatedBy(rs.getString("updated_by"));
                mediaType.setUpdatedTimestamp(rs.getTimestamp("updated_timestamp"));
                mediaTypeList.add(mediaType);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return mediaTypeList;
    }

    @Override
    public void executeAddList(List<DTOBase> arg0) {
        // TODO Auto-generated method stub
    }

    @Override
    public void executeDeleteList(List<DTOBase> arg0) {
        // TODO Auto-generated method stub
    }

    @Override
    public void executeUpdateList(List<DTOBase> arg0) {
        // TODO Auto-generated method stub
    }

    @Override
    protected DTOBase rsToObj(ResultSet arg0) {
        // TODO Auto-generated method stub
        return null;
    }
    public static void main(String[] args) {
        testCRUD();
    }

    public static void testCRUD() {
        MediaTypeDAO mediaTypeDAO = new MediaTypeDAO();

        // Create a new MediaTypeDTO
        MediaTypeDTO newMediaType = new MediaTypeDTO();
        newMediaType.setCode("IMG");
        newMediaType.setName("Image");
        newMediaType.setAddedBy("admin");

        // Add the new MediaTypeDTO
        mediaTypeDAO.executeAdd(newMediaType);
        System.out.println("Added: " + newMediaType);

        // List all MediaTypeDTOs
        List<DTOBase> mediaTypeList = mediaTypeDAO.getList();
        System.out.println("List of MediaTypes:");
        for (DTOBase dto : mediaTypeList) {
            System.out.println(dto);
        }

        // Delete the MediaTypeDTO
        mediaTypeDAO.executeDelete(newMediaType);
        System.out.println("Deleted: " + newMediaType);
    }
}
