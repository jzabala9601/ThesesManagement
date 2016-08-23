package com.services;

import java.io.IOException;
import java.security.MessageDigest;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import com.beans.UserAccount;
import com.dao.UserAccountDao;
import com.utils.MySQLConnectionFactory;

@Path("/userAccounts")
public class UserAccountService {
	
	@GET
	@Path("/search")
	@Produces(MediaType.APPLICATION_JSON)
	public Response search(
			@QueryParam("value") @DefaultValue("") String value, 
			@QueryParam("pageNumber") @DefaultValue("0") int pageNumber,
			@QueryParam("itemsPerPage") @DefaultValue("10") int itemsPerPage
			){
		Response response = Response.serverError().build();
		Connection connection = null;
		try{
			connection = MySQLConnectionFactory.createConnection();
			UserAccountDao dao = new UserAccountDao();
			List<UserAccount> userAccounts = dao.search(value, pageNumber, itemsPerPage, connection);
			response = Response.ok(userAccounts).build();
		}catch(Exception e){
			response = Response.serverError().build();
		}finally{
			if(connection != null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return response;
	}
	
	@GET
	@Path("/count")
	@Produces(MediaType.APPLICATION_JSON)
	public Response count(@QueryParam("value") @DefaultValue("") String value){
		Response response = null;
		Connection connection = null;
		try{
			connection = MySQLConnectionFactory.createConnection();
			UserAccountDao dao = new UserAccountDao();
			int count = dao.count(value, connection);
			JSONObject json = new JSONObject();
			json.put("count", count);
			response = Response.ok(json).build();
		}catch(Exception e){
			response = Response.serverError().build();
		} finally{
			if(connection != null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					//ignore
				}
			}
		}
		return response;
	}
	
	@POST
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(UserAccount userAccount){	
		Response response = null;
		if(userAccount == null){
			response = Response.serverError().entity("UserAccount cannot be null").build();
		} else {
			Connection connection = null;
			try {
				connection = MySQLConnectionFactory.createConnection();
				UserAccountDao dao = new UserAccountDao();
				if(dao.usernameExists(userAccount.getUsername(), connection)){
					response = Response.serverError().entity("Username already exists").build();
				}else{
					userAccount.setPassword(dao.toMd5String("d3fp@55w0rd"));
					dao.create(userAccount, connection);
					connection.commit();
					response = Response.ok(userAccount).build();			
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				response = Response.serverError().entity(e.getMessage()).build();
			}finally{
				if(connection != null){
					try {
						connection.close();
					} catch (SQLException e) {
						// TODO Auto-generated catch block
						response = Response.serverError().entity(e.getMessage()).build();
					}
				}
			}
		}
		return response;
	}
	
	@GET
	@Path("/usernameExists")
	@Produces(MediaType.APPLICATION_JSON)
	public Response usernameExists(@QueryParam("username") String username){
	
		Response response = null;
		
		Connection connection = null;
		try {
			
			connection = MySQLConnectionFactory.createConnection();
			UserAccountDao dao = new UserAccountDao();
			boolean usernameExists = dao.usernameExists(username, connection);
			
			JSONObject json = new JSONObject();
			json.put("usernameExists", usernameExists);
			response = Response.ok(json, MediaType.APPLICATION_JSON_TYPE).build();
			
		} catch (ClassNotFoundException | IOException | SQLException | JSONException e) {
			// TODO Auto-generated catch block
			response = Response.serverError().build();
		}finally {
			if(connection != null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		
		return response;
		
	}
	
	@GET
	@Path("/get")
	@Produces(MediaType.APPLICATION_JSON)
	public Response get(@QueryParam("id") int id){
		Response response = null;
		Connection connection = null;
		try {
			connection = MySQLConnectionFactory.createConnection();
			UserAccountDao dao = new UserAccountDao();
			UserAccount userAccount = dao.get(id, connection);
			connection.close();
			response = Response.ok(userAccount).build();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			response = Response.serverError().build();
		} finally {
			try {
				connection.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return response;
	}
	
}
