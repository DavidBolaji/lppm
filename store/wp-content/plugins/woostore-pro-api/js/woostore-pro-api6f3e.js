jQuery(document).ready(function ($) {
  $(document).on(
    "blur",
    ".woostore-pro-update-firebase-server-key",
    function () {
        var serverKey = $(this).val();
      $.ajax({
        type: "post",
        url: MyAjax.ajaxurl,
        data: {
          action: "woostore_pro_update_firebase_server_key",
          serverKey: serverKey,
        },
        success: function (result) {
          if (result == "success") {
          }
        },
      });
      return false;
    }
  );

  $(document).on("blur", ".woostore-pro-update-new-order-title", function () {
    var title = $(this).val();
    $.ajax({
      type: "post",
      url: MyAjax.ajaxurl,
      data: {
        action: "woostore_pro_update_new_order_title",
        title: title,
      },
      success: function (result) {
        if (result == "success") {
        }
      },
    });
    return false;
  });

  $(document).on("blur", ".woostore-pro-update-new-order-message", function () {
    var message = $(this).val();
    $.ajax({
      type: "post",
      url: MyAjax.ajaxurl,
      data: {
        action: "woostore_pro_update_new_order_message",
        message: message,
      },
      success: function (result) {
        if (result == "success") {
        }
      },
    });
    return false;
  });

  $(document).on(
    "blur",
    ".woostore-pro-update-status-order-title",
    function () {
        var title = $(this).val();
      $.ajax({
        type: "post",
        url: MyAjax.ajaxurl,
        data: {
          action: "woostore_pro_update_status_order_title",
          title: title,
        },
        success: function (result) {
          if (result == "success") {
          }
        },
      });
      return false;
    }
  );

  $(document).on(
    "blur",
    ".woostore-pro-update-status-order-message",
    function () {
        var message = $(this).val();
      $.ajax({
        type: "post",
        url: MyAjax.ajaxurl,
        data: {
          action: "woostore_pro_update_status_order_message",
          message: message,
        },
        success: function (result) {
          if (result == "success") {
          }
        },
      });
      return false;
    }
  );

  $(".toggle-jwt-secret-key").click(function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });
});
