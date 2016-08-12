<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%@ include file="../common/corePlugIns.html" %>
<link rel="stylesheet" href="style.css" />
<title>Advisers - Theses Management</title>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<%@ include file="../common/sideBar.jsp" %>
			<div class="col-md-10">
			
				<!-- write your contents here -->
				
				<h1 class="display-1">Advisers</h1>
				
				<div class="row col-md-12 col-xs-12" id="divSearch">
					<div class="col-md-5 col-xs-5">
						<div class="input-group">
							<input type="text" class="form-control" placeholder="Search User Accounts..." /> <span class="input-group-btn">
								<button class="btn btn-default" type="button">Go!</button>
							</span>
						</div>
					</div>
					<div class="col-md-7 col-xs-7">
						<div class="input-group">
							<button class="btn btn-primary" id="button_create">New Adviser</button>
							<button class="btn btn-info" id="button_edit">Edit</button>
							<button class="btn btn-danger" id="button_delete">Delete</button>
						</div>
					</div>
				</div>
				
				<div class="container-fluid" style="height: 20px;"></div>
				
				<div class="row col-md-12 col-xs-12">
					<div class="container-fluid">
						<table class="table table-condensed table-bordered" id="tblSearchResults">
							<thead>
								<tr>
									<th class="col-md-3">Name</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="script.js"></script>
</html>