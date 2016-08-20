
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
	
	/**
	 * End: Functions
	 */
	
	/**
	 * Begin: Event Handlers
	 */
	
	$("#button_create").on("click", function(){
		showCreateForm();
	})
	
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
	
	$messageBox.find("button.btn").on("click", function(){
		$messageBox.fadeOut();
	})
	
	$("#button_showMessageBox").on("click", function(){
		showMessage("Error Message", "This is a sample error message", "error");
	})
	
	/**
	 * End: Event Handlers
	 */
	
});