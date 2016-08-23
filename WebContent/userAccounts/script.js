
$(document).ready(function(){
	
	/**
	 * Begin: Initializations
	 */
	
	var $form = $("#form_userAccount");
	var $messageBox = $("#messageBox");

	$("#navBtnUserAccounts").addClass("active");
	$("#button_delete").addClass("disabled");
	$("#button_edit").addClass("disabled");

	/**
	 * End: Initializations
	 */
	
	/**
	 * Begin: Functions
	 */
	
	function showCreateForm(){
		var $form = $("#form_userAccount");
		$form.find("#title").text("New User Account");
		$form.find("input").val("");
		$form.removeClass("has-error has-success");
		$form.find("button.btn-warning").parent().addClass("hidden");
		$form.fadeIn();
	}
	
	function showEditForm(userAccount){
		var $form = $("#form_userAccount");
		$form.find("#title").text("Edit User Account");
		$form.find("input").val("");
		$form.removeClass("has-error has-success");
		$form.find("button.btn-warning").parent().removeClass("hidden");
	}
	
	function validateForm(){
		validateUsername();
	}
	
	function validateUsername(){
		
		var $usernameField = $("#form_userAccount").find("#username");
		
		//clear feedbacks
		$username.parent().removeClass("has-success has-error");
		$username.parent().find("span").removeClass("glyphicon-ok glyphicon-remove");
		$usernameField.parent().find("p").text("");
		
		var $usernameField = $form.find("#username");
		if($username.val().trim().length < 1){
			$username.parent().addClass("has-error");
			$username.parent().find("span").addClass("glyphicon-remove");
			$usernameField.parent().find("p").text("Username is required");
		} else {
			$username.parent().addClass("has-success");
			$username.parent().find("span").addClass("glyphicon-ok");
		}
	}
	
	function validateName(){
		var $lastnameField = $form.find("#lastname");
		var $firstnameField = $form.find("#firstname");
	}
	
	function formHasErrors(){
		return false;
	}
	
	function showMessage(title, message, type){
		$messageBox.find("#title").text(title);
		$messageBox.find("#message").text(message);
		if(type == "error"){
			$messageBox.find("button.btn").removeClass("alert-success").addClass("alert-danger");
			$messageBox.removeClass("alert-success").addClass("alert-danger");
		} else if(type == "success") {
			$messageBox.find("button.btn").removeClass("alert-danger").addClass("alert-success");
			$messageBox.removeClass("alert-danger").addClass("alert-success");
		}
		$messageBox.fadeIn();
	}
	
	function clearForm(){
		$form.find("input").val("");
	}
	
	function setFormContent(options){
		$form.find("#username").text(options.username);
		$form.find("#lastname").text(options.lastname);
		$form.find("#firtsname").text(options.firstname);
		$form.find("#middlename").text(options.middlename);
	}
	
	function setFormChangePasswordButtonVisible(visible){
		if(visible) {
			$form.find(".btn-warning").parent().removeClass("hidden");
		} else {
			$form.find(".btn-warning").parent().addClass("hidden");
		}
	}
	
	function setFormVisible(visible){
		if(visible){
			$form.fadeIn();
		} else {
			$form.fadeOut();
		}
	}
	
	function setFormTitle(title){
		$form.find("#title").text(title);
	}
	
	function formHasValidData(){
		var fieldIds = ["#username", "#lastname", "#firstname"];
		var hasValidData = true;
		for(var a = 0; a < fieldIds.length; a++) {
			if($form.find(fieldIds[a]).val().trim().length < 1){
				$form.find(fieldIds[a]).parent().removeClass("has-success").addClass("has-error");
				$form.find(fieldIds[a]).parent().find("span").removeClass("glyphicon-ok").addClass("glyphicon-remove");
				hasValidData = false;
			} else {
				$form.find(fieldIds[a]).parent().removeClass("has-error").addClass("has-success");
				$form.find(fieldIds[a]).parent().find("span").removeClass("glyphicon-remove").addClass("glyphicon-ok");
			}
		}
		return hasValidData;
	}
	
	function createUserAccount(userAccount) {
		$.ajax({
			type: "GET",
			url: "/ThesesManagement/rest/userAccounts/usernameExists?username=" + userAccount.username,
			success: function(responseData) {
				if(!responseData.usernameExists) {
					$.ajax({
						type: "POST",
						contentType: "application/json",
						data: JSON.stringify(userAccount),
						url: "/ThesesManagement/rest/userAccounts/create",
						success: function(responseData){
							clearForm();
							setFormVisible(false);
							showMessage("User Account", "User Account created.", "success");
						},
						error: function(jqXHR, errorThrown, textStatus){
							alert("show error dialog box: Failed creating user account");
						}
					});
				} else {
					$form.find("")
					setFormVisible(false);
					showMessage("User Account", "Username already used.", "error");
					setFormVisible(true);
				}
			},
			error: function(jqXHR, errorThrown, textStatus) {
				alert("show error dialog box: Can't check if username exists");
			}
		});
	}

	function search(value, pageNumber, itemsPerPage){
		$.ajax({
			type: "GET",
			url: "/ThesesManagement/rest/userAccounts/count?value=" + value,
			success: function(responseData){
				var count = responseData.count;
				if(count > 0){
					$.ajax({
						type: "GET",
						url: "/ThesesManagement/rest/userAccounts/search?value=" + value + "&pageNumber=" + pageNumber + "&itemsPerPage=" + itemsPerPage,
						success: function(responseData){
							$("#button_edit").addClass("disabled");
							$("#button_delete").addClass("disabled");
							$("#table_searchResults tbody").empty();
							var plottedRows = 0;
							$.each(responseData, function(index, item){
								
								var usernameCell = $(document.createElement("td"));
								$(usernameCell).text(item.username);
								
								var nameCell = $(document.createElement("td"));
								$(nameCell).text(item.lastname + ", " + item.firstname + (item.middlename.length > 0 ? " " + item.middlename : ""));
								
								var row = $(document.createElement("tr"));
								$(row).append(usernameCell);
								$(row).append(nameCell);
								$(row).attr("data-id", item.id);
								$("#table_searchResults tbody").append(row);
								plottedRows++;
								
							});
							
							var visibleButtonsCount = 7;
							var totalPages = Math.ceil(count / itemsPerPage);
							var startingPage = 1;
							var endingPage = totalPages;
							if(pageNumber > Math.ceil(visibleButtonsCount / 2)) {
								startingPage = pageNumber - Math.floor(visibleButtonsCount / 2);
							}
							endingPage = startingPage + 6;
							if(endingPage > totalPages) {
								endingPage = totalPages;
								startingPage = endingPage - 6;
							}
							if(startingPage < 1){
								startingPage = 1;
							}
							
							$(".pagination").empty();
							
							var toFirstPage = $(document.createElement("li"));
							$(toFirstPage).attr("data-pagenumber", 1);
							$(toFirstPage).attr("data-searchvalue", value);
							$(toFirstPage).append("<a href='#'>&lt;&lt;</a>");
							if(pageNumber == 1){
								$(toFirstPage).addClass("disabled");
							}
							$(".pagination").append(toFirstPage);

							var toPreviousPage = $(document.createElement("li"));
							$(toPreviousPage).attr("data-pagenumber", pageNumber < 2 ? 1 : pageNumber - 1);
							$(toPreviousPage).attr("data-searchvalue", value);
							$(toPreviousPage).append("<a href='#'>&lt;</a>");
							if(pageNumber == 1){
								$(toPreviousPage).addClass("disabled");
							}
							$(".pagination").append(toPreviousPage);
							
							for(var currentNumber = startingPage; currentNumber <= endingPage; currentNumber++){
								var listItem = $(document.createElement("li"));
								$(listItem).attr("data-pagenumber", currentNumber);
								$(listItem).attr("data-searchvalue", value);
								if(currentNumber == pageNumber){
									$(listItem).addClass("active");
								}
								$(listItem).append("<a href='#'>" + currentNumber + "</a>");
								$(".pagination").append(listItem);
							}
							
							var toNextPage = $(document.createElement("li"));
							$(toNextPage).attr("data-pagenumber", pageNumber < totalPages ? pageNumber + 1 : pageNumber);
							$(toNextPage).attr("data-searchvalue", value);
							$(toNextPage).append("<a href='#'>&gt;</a>");
							if(pageNumber == totalPages){
								$(toNextPage).addClass("disabled");
							}
							$(".pagination").append(toNextPage);
							
							var toLastPage = $(document.createElement("li"));
							$(toLastPage).attr("data-pagenumber", totalPages);
							$(toLastPage).attr("data-searchvalue", value);
							$(toLastPage).append("<a href='#'>&gt;&gt;</a>");
							if(pageNumber == totalPages){
								$(toLastPage).addClass("disabled");
							}
							$(".pagination").append(toLastPage);
							
						},
						error: function(jqXHR, errorThrown, textStatus){
							alert("Server Error: " + errorThrown);
						}
					});
					
				} else {
					alert("Nothing found");
				}
			},
			error: function(jqXHR, errorThrown, textStatus){
				alert("Server Error: " + errorThrown);
			}
		});
	}
	
	function showConfirmDelete(){
		
	}
	
	/**
	 * End: Functions
	 */
	
	/**
	 * Begin: Event Handlers
	 */
	
	$("#button_create").on("click", function(){
		showCreateForm();
	})
	
	$("#button_edit").on("click", function(){

	})
	
	$("#button_delete").on("click", function(){
		var $dialog = $("#confirmation_deleteUserAccount");
		$dialog.fadeIn();
	})
	
	$("#confirmation_deleteUserAccount").find("button.btn-danger").on("click", function(){
		alert("Delete selected user account");
	});
	
	$("#confirmation_deleteUserAccount").find("button.btn-default").on("click", function(){
		var $dialog = $("#confirmation_deleteUserAccount");
		$dialog.fadeOut();
	});
	
	$("#form_userAccount").find("button.btn-danger").on("click", function(){
		clearForm();
		$form.fadeOut();
	})
	
	$("#form_userAccount").find("button.btn-primary").on("click", function(){
		if(formHasValidData()){
			var userAccount = {
					username: $form.find("#username").val().trim(),
					lastname: $form.find("#lastname").val().trim(),
					firstname: $form.find("#firstname").val().trim(),
					middlename: $form.find("#middlename").val().trim()
			};
			createUserAccount(userAccount);
		}
	})
	
<<<<<<< HEAD
	$("#table_searchResults").on("click", "tr", function(){
		
		if(!$(this).parent().is("thead")){
			$("#button_edit").removeClass("disabled");
			$("#button_delete").removeClass("disabled");
			
			var source = this;
			$.each($(this).parent().children(), function(index, item){			
				if(item === source){
					$(item).addClass("active");
				} else {
					$(item).removeClass("active");
				}
				
			});
		}
		
	});
	
	$(".pagination").on("click", "li", function(){
		if(!$(this).hasClass("disabled")){
			search($(this).data("searchvalue"), $(this).data("pagenumber"), 12);	
		}
	});
	
	$("#searchBox button").on("click", function(){
		search($("#searchBox input").val(), 1, 12);
	});
	
	$("#searchBox input").on("keypress", function(event){
		var keyCode = event.which || event.keyCode;
		if(keyCode == 13){
			search($(this).val(), 1, 12);
		}
	});
=======
	$messageBox.find("button.btn").on("click", function(){
		$messageBox.fadeOut();
	})
	
	$("#button_showMessageBox").on("click", function(){
		showMessage("Error Message", "This is a sample error message", "error");
	})
>>>>>>> origin/master
	
	/**
	 * End: Event Handlers
	 */
	
});