let rotation = 0;
function rotateImage(id) {
  rotation += 90; // Increase rotation by 90 degrees
  console.log(rotation);
  $("#" + $(id).attr("id")).css({
    "-webkit-transform": "rotate(" + rotation + "deg)",
    "-moz-transform": "rotate(" + rotation + "deg)",
    transform: "rotate(" + rotation + "deg)",
  });
}

function getKodeAlokasi(alokasi) {
  if (alokasi === "SEP-23") {
    return "21 | SEPTEMBER";
  } else if (alokasi === "OKT-23") {
    return "22 | OKTOBER";
  } else if (alokasi === "NOV-23") {
    return "23 | NOVEMBER";
  } else if (alokasi === "DES-23") {
    return "31 | DESEMBER";
  } else if (alokasi === "AGU-24") {
    return "47 | AGUSTUS";
  } else if (alokasi === "OKT-24") {
    return "48 | OKTOBER";
  } else if (alokasi === "DES-24") {
    return "49 | DESEMBER";
  } else {
    throw new Error("Alokasi salah!");
  }
}

function showPbp(PBPS) {
  let filterPbps = null;
  if (filterType !== null) {
    filterPbps = PBPS.filter((pbp) => pbp.STATUS === filterType);
  } else {
    filterPbps = PBPS;
  }

  if (filterPbps.length !== 0) {
    let jumlahPengganti = 0;
    let jumlahPerwakilan = 0;
    let jumlahSisa = 0;
    let jumlahAwal = 0;
    let jumlah1KK = 0;
    filterPbps.forEach(
      (
        {
          NO,
          KOTA,
          KECAMATAN,
          DESA,
          NO_PBP,
          NAMA,
          NIK,
          RT,
          RW,
          NIK_PENERIMA,
          NAMA_PENERIMA,
          RT_PENERIMA,
          RW_PENERIMA,
          FOTO_URL,
          PEKERJAAN,
          STATUS,
          ALASAN,
        },
        index
      ) => {
        if (
          NAMA !== NAMA_PENERIMA &&
          STATUS !== "PERWAKILAN" &&
          STATUS !== "PENGGANTI"
        ) {
          jumlah1KK++;
        }

        if (STATUS === "PENGGANTI") {
          jumlahPengganti++;
        }

        if (STATUS === "PERWAKILAN") {
          jumlahPerwakilan++;
        }

        if (STATUS === "AWAL") {
          jumlahAwal++;
        }

        if (STATUS === "" || STATUS === "-") {
          jumlahSisa++;
        }
        let kodeAlokasi = null;
        if (alokasi === "AGUSTUS_2024") {
          kodeAlokasi = "47";
        } else if (alokasi === "OKTOBER_2024") {
          kodeAlokasi = "48";
        } else if (alokasi === "DESEMBER_2024") {
          kodeAlokasi = "49";
        }

        const url = `https://astridjplb.id/files/img/dokumen/${kodeAlokasi}/JAWATENGAH/${KOTA.replace(
          " ",
          ""
        ).replace(".", "")}/${KECAMATAN.replace(" ", "")}/${DESA.replace(
          " ",
          ""
        )}/2PBP_${FOTO_URL.split(".")[0]}.jpg`;
        const urlKtp = `https://astridjplb.id/files/img/dokumen/${kodeAlokasi}/JAWATENGAH/${KOTA.replace(
          " ",
          ""
        ).replace(".", "")}/${KECAMATAN.replace(" ", "")}/${DESA.replace(
          " ",
          ""
        )}/2PBP_${FOTO_URL.split(".")[0]}_ktp.jpg`;

        let TEXT_STATUS = "";

        if (STATUS === "PENGGANTI") {
          TEXT_STATUS = `<span class="dot bg-success"></span>&nbsp;${
            ALASAN !== undefined ? ALASAN.toUpperCase() : ""
          }`;
        } else if (STATUS === "PERWAKILAN") {
          TEXT_STATUS = `<span class="dot bg-primary"></span>&nbsp;${
            ALASAN !== undefined ? ALASAN.toUpperCase() : ""
          }`;
        } else if (STATUS === "-" || STATUS === "") {
          TEXT_STATUS = `<span class="dot bg-danger"></span>&nbsp;${
            ALASAN !== undefined ? ALASAN.toUpperCase() : "BELUM"
          }`;
        } else if (NIK !== NIK_PENERIMA) {
          TEXT_STATUS = `<span class="dot bg-secondary"></span>&nbsp;${
            ALASAN !== undefined ? ALASAN.toUpperCase() : "1KK"
          }`;
        }
        $("#table-body").append(`
                        <tr role="button" data-bs-toggle="collapse" data-bs-target="#${NIK}" aria-expanded="false" aria-controls="${NIK}">
                            <th scope="row">${NO}</th>
                            <td>${NO_PBP}</td>
                            <td>${NAMA}</td>
                            <td>${NIK}&nbsp;</td>
                            <td class="non-click" contenteditable>${NAMA_PENERIMA}</span></td>
                            <td class="non-click"><span contenteditable>${NIK_PENERIMA}</span>&nbsp;</td>
                            <td class="non-click" contenteditable>${
                              RT_PENERIMA === undefined ? RT : RT_PENERIMA
                            }</td>
                            <td class="non-click" contenteditable>${
                              RW_PENERIMA === undefined ? RW : RW_PENERIMA
                            }</td>
                            <td class="non-click" contenteditable></td>
                            <td class="align-middle"><div class="d-flex align-items-center">${TEXT_STATUS}</div></td>
                        </tr>
                        ${
                          STATUS !== "-"
                            ? `<tr id="${NIK}" class="exclude collapse ${
                                isShow ? "show" : ""
                              }">
                            <!--- <td class="bg-transparent"></td> --->
                            <td colspan="7">
                                <div class="d-flex" width="100%">
                                    <img loading="lazy" src="${url}" width="100%" id="I${NIK}" class="object-fit-contain"/>
                                    <img loading="lazy" src="${urlKtp}" width="100%" id="K${NIK}" class="zoom-move object-fit-contain" onclick="rotateImage('#K${NIK}')"/>
                                </div>
                            </td>
                            <td>
                            </td>
                       
                        </tr>`
                            : ""
                        }

                    `);
        $("#jumlah-pbp").html("JUMLAH |  " + PBPS.length);
        $("#jumlah-awal").html("AWAL |  " + jumlahAwal);
        $("#jumlah-pengganti").html("PENGGANTI |  " + jumlahPengganti);
        $("#jumlah-perwakilan").html("PERWAKILAN |  " + jumlahPerwakilan);
        $("#jumlah-1kk").html("1KK |  " + jumlah1KK);
        $("#jumlah-sisa").html("SISA |  " + jumlahSisa);
      }
    );
  } else {
    $("#table-body").html("");
  }
}

$(".zoom-move").hover(
  function () {
    $(this).css("transform", "scale(1.2) translate(10px, 10px)");
  },
  function () {
    $(this).css("transform", "");
  }
);
