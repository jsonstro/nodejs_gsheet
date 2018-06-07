$(document).ready(function () {
  $('#user-clear').click(function () {
    $('#deck-sn').val("");
    $('#mfgdate').val("");
    $('#motorsnl').val("");
    $('#motorsnr').val("");
    $('#fwversion').val("");
    $('#bcuversion').val("");
    $('#drecid').val("");
    $('#rrecid').val("");
    $('#netsuite').val("");
    $('#shipdate').val("");
    $('#ordernum').val("");
    $('#internalid').val("");
    $('#shipvia').val("");
    $('#weight').val("");
    $('#trackingnu').val("");
    $('#item').val("");
    $('#motor_comments').val("");
    $('#motor_failure_code').val("");
    $('#main_board_sn').val("");
    $('#ma_comments').val("");
    $('#ma_failure_code').val("");
    $('#battery_comments').val("");
    $('#battery_failure_code').val("");
    $('#battery_sn').val("");
    $('#remote_sn').val("");
    $('#firstname').val("");
    $('#lastname').val("");
    $('#addr').val("");
    $('#addr2').val("");
    $('#city').val("");
    $('#state').val("");
    $('#zipcode').val("");
    $('#cntry').val("");
    $('#inpart').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#spc_code').val("");
    $('#ship_first').val("");
    $('#ship_last').val("");
    $('#ship_addr').val("");
    $('#ship_addr2').val("");
    $('#ship_city').val("");
    $('#ship_st').val("");
    $('#ship_zip').val("");
    $('#ship_ctry').val("");
  });
  function pad(n) {
    return n<10 ? '0'+n : n
  }
  function postForm() {
    var payload = {
      deck_sn: $('#deck-sn').val()
    };
    $.ajax({
      url: "/api/form_d",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function (data) {
        const a = JSON.parse(data.responseText, (key, value) => {
          if (key === "date") {
            var currentDate = new Date(value);
            var date = currentDate.getDate();
            var month = currentDate.getMonth();
            var year = currentDate.getFullYear();
            var mmddyyyy = pad(month + 1) + "/" + pad(date) + "/" + year;
            $('#mfgdate').val(mmddyyyy);
          } else if (key === "motor_sn_l") {
            $('#motorsnl').val(value);
          } else if (key === "motor_sn_r") {
            $('#motorsnr').val(value);
          } else if (key === "fw_version") {
            $('#fwversion').val(value);
          } else if (key === "bcu_version") {
            $('#bcuversion').val(value);
          } else if (key === "battery_sn") {
            $('#battery_sn').val(value);
          } else if (key === "remote_sn") {
            $('#remote_sn').val(value);
          } else if (key === "main_board_sn") {
            $('#main_board_sn').val(value);
          } else if (key === "ma_comments") {
            $('#ma_comments').val(value);
          } else if (key === "ma_failure_code") {
            $('#ma_failure_code').val(value);
          } else if (key === "battery_comments") {
            $('#battery_comments').val(value);
          } else if (key === "battery_failure_code") {
            $('#battery_failure_code').val(value);
          } else if (key === "motor_comments") {
            $('#motor_comments').val(value);
          } else if (key === "motor_failure_code") {
            $('#motor_failure_code').val(value);
          } else if (key === "id") {
            $('#drecid').val(value);
          }
        });
      }
    });
    $.ajax({
      url: "/api/form_r",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function (data) {
        const a = JSON.parse(data.responseText, (key, value) => {
          if (key === "alternateid") {
            $('#netsuite').val(value);
          } else if (key === "firstname") {
            $('#firstname').val(value);
          } else if (key === "lastname") {
            $('#lastname').val(value);
          } else if (key === "company") {
            $('#company').val(value);
          } else if (key === "ordernum") {
            $('#ordernum').val(value);
          } else if (key === "internalid") {
            $('#internalid').val(value);
          } else if (key === "trackingnu") {
            $('#trackingnu').val(value);
          } else if (key === "item") {
            $('#item').val(value);
          } else if (key === "addr") {
            $('#addr').val(value);
          } else if (key === "addr2") {
            $('#addr2').val(value);
          } else if (key === "city") {
            $('#city').val(value);
          } else if (key === "state") {
            $('#state').val(value);
          } else if (key === "zipcode") {
            $('#zipcode').val(value);
          } else if (key === "cntry") {
            $('#cntry').val(value);
          } else if (key === "shipdate") {
            var currentDate = new Date(value);
            var date = currentDate.getDate();
            $('#shipdate').val(date);
            var month = currentDate.getMonth();
            var year = currentDate.getFullYear();
            var mmddyyyy = pad(month + 1) + "/" + pad(date) + "/" + year;
            $('#shipdate').val(mmddyyyy);
          } else if (key === "email") {
            $('#email').val(value);
          } else if (key === "phone") {
            $('#phone').val(value);
          } else if (key === "spc_code") {
            $('#spc_code').val(value);
          } else if (key === "inpart") {
            $('#inpart').val(value);
          } else if (key === "ship_first") {
            $('#ship_first').val(value);
          } else if (key === "ship_last") {
            $('#ship_last').val(value);
          } else if (key === "ship_addr") {
            $('#ship_addr').val(value);
          } else if (key === "ship_addr2") {
            $('#ship_addr2').val(value);
          } else if (key === "ship_city") {
            $('#ship_city').val(value);
          } else if (key === "ship_st") {
            $('#ship_st').val(value);
          } else if (key === "ship_zip") {
            $('#ship_zip').val(value);
          } else if (key === "ship_ctry") {
            $('#ship_ctry').val(value);
          } else if (key === "id") {
            $('#rrecid').val(value);
          }
        });
      }
    });
  }
  $('#user-submit').click(function () {
    postForm();
  });
  $("form#input").keydown(function(event){
    if(event.which == 13) {
      event.preventDefault();
      postForm();
    }
  });
  const files = [];
  $("input[type=file]").change(function(event) {
    $.each(event.target.files, function(index, file) {
      var reader = new FileReader();
      reader.onload = function(event) {
        object = {};
        object.filename = file.name;
        object.data = event.target.result;
        files.push(object);
      };
      reader.readAsDataURL(file);
    });
  });
  $("#upload").submit(function(form) {
    $.each(files, function(index, file) {
      $.ajax({
        url: "/api/upport_r",
        type: 'POST',
        data: {filename: file.filename, data: file.data},
        success: function(data, status, xhr) {}
      });
    });
    files = [];
    form.preventDefault();
  });
  $('#data-import').click(function () {
    var payload = {
      csv_name: $('#csv-name').val()
    };
    $.ajax({
      url: "/api/import_p",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      processData: false,
    });
  });
  $('#data-incremental').click(function () {
    var payload = {
      type: "incremental"
    };
    $.ajax({
      url: "/api/import_d",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      processData: false,
    });
  });
  $('#data-full').click(function () {
    var payload = {
      type: "full"
    };
    $.ajax({
      url: "/api/import_d",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      processData: false,
    });
  });
  $('#create-version').click(function () {
    var payload = {
      fw_version: $('#fw-version').val(),
      bcu_version: $('#bcu-version').val(),
      date_changed: $('#date-changed').val()
    };
    var fw = {
      fw_version: $('#fw-version').val()
    };
    var bcu = {
      bcu_version: $('#bcu-version').val()
    };
    $.ajax({
      url: "/api/fw",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(fw),
      processData: false,
    });
    $.ajax({
      url: "/api/bcu",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(bcu),
      processData: false,
    });
    $.ajax({
      url: "/api/version",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      processData: false,
    });
  });
});
