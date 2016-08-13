
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
	
	/**
	 * End: Event Handlers
	 */
	
});