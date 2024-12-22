const toast = document.getElementById("toast");
toast.style.display = "flex"; // Show the toast
function showHeader() {
  $("#table-main").removeClass("d-none");
}

function hideHeader() {
  $("#table-main").addClass("d-none");
}

setTimeout(() => {
  toast.style.display = "none"; // Hide the toast after 5 seconds
}, 2000); // 5000 milliseconds = 5 seconds

const loading = document.getElementById("toast-loading");
function showloading() {
  loading.style.display = "flex";
}

function hideloading() {
  loading.style.display = "none";
}
$.ajax({
  type: "GET",
  url: "https://agungfirdevgithubio-default-rtdb.asia-southeast1.firebasedatabase.app/count.json",
  dataType: "json",
  success: function (count) {
    $.ajax({
      type: "PUT",
      url: "https://agungfirdevgithubio-default-rtdb.asia-southeast1.firebasedatabase.app/count.json",
      data: JSON.stringify(count + 1),
      success: function (data) {},
      error: function (xhr, status, error) {},
    });
  },
  error: function (xhr, status, error) {},
});
let DESA = [];
let PBP = [];
let kecamatanSelected = null;
let desaSelected = null;
let statusSelected = 1;
let filterPbp = [];
let alokasi = null;
let filterType = null;
let alokasiSelected = null;
let isShow = false;
$.getJSON("../data/DESA.json", function (data) {
  showloading();
  DESA = [...data];
  hideloading();
});

$("#select-alokasi").on("change", function () {
  showPbp([]);
  if (alokasi !== this.value) {
    $("#select-desa").prop("disabled", true);
    $("#select-kecamatan").val($("#select-kecamatan option:first").val());
    $("#select-desa").prop("disabled", true);
    $("#select-desa").val($("#select-desa option:first").val());
  }
  alokasi = this.value;

  if (alokasi !== null) {
    $("#select-kecamatan").prop("disabled", false);
  }
});

$("#select-kecamatan").on("change", function () {
  showPbp([]);
  statusSelected = 1;
  if (this.value !== "Pilih Kecamatan") {
    kecamatanSelected = this.value;
    $("#select-desa").prop("disabled", false);
    $("#select-desa")
      .find("option")
      .remove()
      .end()
      .append('<option value="whatever">Pilih desa..</option>');
    showSelectVillage(this.value);
  } else {
    $("#select-desa").prop("disabled", true);
    $("#select-desa")
      .find("option")
      .remove()
      .end()
      .append('<option value="whatever">Pilih dulu kecamatan..</option>')
      .val("Pilih dulu kecamatan");
    showSelectVillage("TIDAK ADA");
    showPbp([]);
  }
});

function showSelectVillage(kecamatan) {
  const filter = DESA.filter((desa) => desa.KECAMATAN === kecamatan);
  filter.forEach((desa) => {
    $("#select-desa").append(
      `<option value="${desa.DESA}">${desa.DESA}</option>`
    );
  });
}

$("#select-desa").on("change", function () {
  showPbp([]);
  showHeader();
  desaSelected = this.value;
  statusSelected = 1;

  if (desaSelected !== "Pilih desa..") {
    showloading();
    $.getJSON(
      `../data/${alokasi}/KAB. PEMALANG_${kecamatanSelected}_${desaSelected}_${alokasi}.json`,
      function (data) {
        PBP = [...data];

        $("#select-filter-status").attr("disabled", false);
        showPbp([]);
        showPbp(PBP);
        hideloading();
      }
    );
  } else {
    showSelectVillage("TIDAK ADA");
    showPbp([]);
  }
});

$("#header-status").on("click", function () {
  if (statusSelected >= 4) {
    statusSelected = 1;
  } else {
    statusSelected++;
  }
  console.log("STATUS SELECTED", statusSelected);
  if (statusSelected === 1) {
    filterType = null;
  } else if (statusSelected === 2) {
    filterType = "AWAL";
  } else if (statusSelected === 3) {
    filterType = "PENGGANTI";
  } else if (statusSelected === 4) {
    filterType = "PERWAKILAN";
  }
  showPBP();
});

function showPBP() {
  showPbp([]);
  showPbp(PBP);
}

$("#check-open-foto-all").change(function () {
  isShow = this.checked;
  showPBP();
});
