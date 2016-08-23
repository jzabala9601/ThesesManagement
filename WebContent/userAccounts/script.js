
$(document).ready(function(){
	
	/**
	 * Begin: Initializations
	 */
	
	$("#navBtnUserAccounts").addClass("active");
	$("#button_delete").addClass("disabled");
	$("#button_edit").addClass("disabled");

	/**
	 * End: Initializations
	 */
	
	/**
	 * Begin: Functions
	 */

	function clearForm(){
		var $form = $("#form_userAccount");
		$form.find("input").val("");
	}
	
	function setFormContent(options){
		var $form = $("#form_userAccount");
		$form.find("#username").text(options.username);
		$form.find("#lastname").text(options.lastname);
		$form.find("#firtsname").text(options.firstname);
		$form.find("#middlename").text(options.middlename);
	}
	
	function setFormChangePasswordButtonVisible(visible){
		var $form = $("#form_userAccount");
		if(visible) {
			$form.find(".btn-warning").parent().removeClass("hidden");
		} else {
			$form.find(".btn-warning").parent().addClass("hidden");
		}
	}
	
	function setFormVisible(visible){
		var $form = $("#form_userAccount");
		if(visible){
			$form.fadeIn();
		} else {
			$form.fadeOut();
		}
	}
	
	function setFormTitle(title){
		$("#form_userAccount").find("#title").text(title);
	}
	
	function formHasValidData(){
		var $form = $("#form_userAccount");
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
							alert("show success dialog box: user account created");
						},
						error: function(jqXHR, errorThrown, textStatus){
							alert("show error dialog box: Failed creating user account");
						}
					});
				} else {
					alert("show error dialog box: username exists");
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
		clearForm();
		setFormTitle("New User Account");
		setFormChangePasswordButtonVisible(false);
		setFormVisible(true);
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
		var $form = $("#form_userAccount");
		clearForm();
		$form.fadeOut();
	})
	
	$("#form_userAccount").find("button.btn-primary").on("click", function(){
		var $form = $("#form_userAccount");
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
	
	/**
	 * End: Event Handlers
	 */
	
});