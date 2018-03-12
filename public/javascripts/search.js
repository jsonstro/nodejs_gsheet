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
  });
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
            $('#mfgdate').val(value);
          } else if (key === "motor_sn_l") {
            $('#motorsnl').val(value);
          } else if (key === "motor_sn_r") {
            $('#motorsnr').val(value);
          } else if (key === "fw_version") {
            $('#fwversion').val(value);
          } else if (key === "bcu_version") {
            $('#bcuversion').val(value);
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
          } else if (key === "shipdate") {
            $('#shipdate').val(value);
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
