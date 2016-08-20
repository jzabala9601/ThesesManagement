<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%@ include file="../common/corePlugIns.html"%>
<script type="text/javascript" src="../plugins/CryptoJS-master/rollups/md5.js"></script>
<link rel="stylesheet" href="style.css" />
<title>User Accounts - Theses Management</title>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<%@ include file="../common/sideBar.jsp"%>
			<div class="col-md-10 col-xs-9">
				<!-- write your contents here -->
				<h1 class="display-1">User Accounts</h1>
				<div class="row col-md-12 col-xs-12" id="divSearch">
					<div class="col-md-5 col-xs-5">
						<div class="input-group" id="searchBox">
							<input type="text" class="form-control" placeholder="Search User Accounts..." />
							<span class="input-group-btn">
							<button class="btn btn-default" type="button">Go!</button>
							</span>
						</div>
					</div>
					<div class="col-md-7 col-xs-7">
						<div class="input-group">
							<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#form_userAccount" id="button_create">New User Account</button>
							<button type="button" class="btn btn-info" id="button_edit">Edit</button>
							<button type="button" class="btn btn-danger" id="button_delete">Delete</button>
						</div>
					</div>
				</div>
				<div class="container-fluid" style="height: 20px;"></div>
				<div class="row col-md-12 col-xs-12">
					<div class="container-fluid">
						<table class="table table-condensed table-bordered" id="tblSearchResults">
							<thead>
								<tr>
									<th class="col-md-5">Username</th>
									<th class="col-md-7">Name</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
						<div class="text-center">
							<ul class="pagination">
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- User Account Form -->
	<div id="form_userAccount" class="modal" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header"><h4 id="title"></h4></div>
				<div class="modal-body">
				
					<div class="form-group has-feedback">
						<label for="username">Username</label>
						<input type="text" id="username" class="form-control" />
						<span class="glyphicon form-control-feedback"></span>
						<p class="text-danger"></p>
					</div>
						
					<div class="form-group has-feedback">
						<label for="username">Lastname</label>
						<input type="text" id="lastname" class="form-control" />
						<span class="glyphicon form-control-feedback"></span>
						<p class="text-danger"></p>
					</div>
					
					<div class="form-group has-feedback">
						<label for="username">Firstname</label>
						<input type="text" id="firstname" class="form-control" />
						<span class="glyphicon form-control-feedback"></span>
						<p class="text-danger"></p>
					</div>
					
					<div class="form-group">
						<label for="username">Middlename</label>
						<input type="text" id="middlename" class="form-control" />
					</div>
					
					<div class="form-group hidden">
						<button type="button" class="btn btn-warning form-control">Change Password</button>
					</div>
					
				</div>
				<div class="modal-footer">
					<div class="input-group">
						<button class="btn btn-primary">Submit</button>
						<button class="btn btn-danger" data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Change Password Form -->
	<div id="form_changePassword" class="modal" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4>Change Password</h4>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="currentPassword">Current Password</label>
						<input id="currentPassword" type="password" class="form-control" />
					</div>
					<div class="form-group">
						<label for="newPassword">New Password</label>
						<input id="newPassword" type="password" class="form-control" />
					</div>
					<div class="form-group">
						<label for="newPasswordConfirmation">Confirm New Password</label>
						<input id="newPasswordConfirmation" type="password" class="form-control" />
					</div>
				</div>
				<div class="modal-footer">
					<div class="input-group">
						<button class="btn btn-primary">Change</button>
						<button class="btn btn-danger">Cancel</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<%@ include file="../common/messageModal.html" %>
	<button type="button" id="button_showMessageBox" class="btn btn-primary">Show Message Box</button>	
</body>
<script type="text/javascript" src="script.js"></script>
</html>