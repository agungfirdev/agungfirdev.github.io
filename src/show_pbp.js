let rotation = 0;
function rotateImage(id) {
  rotation += 90; // Increase rotation by 90 degrees
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

function showPbp(filter, filterType = null) {
  if (filter.length !== 0) {
    let jumlahPengganti = 0;
    let jumlahPerwakilan = 0;
    let jumlahSisa = 0;
    let jumlahAwal = 0;
    let jumlah1KK = 0;
    filter.forEach(
      (
        {
          NO,
          NO_PBP,
          NIK_PBP_AWAL,
          NIK_PBP_PENERIMA,
          NAMA_PBP_AWAL,
          NAMA_PENERIMA,
          STATUS,
          PEKERJAAN,
          KOTA,
          KECAMATAN,
          DESA,
          FOTO_URL,
          ALASAN,
        },
        index
      ) => {
        if (
          NAMA_PBP_AWAL !== NAMA_PENERIMA &&
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
            ALASAN !== undefined ? ALASAN.toUpperCase() : "BELUM DISERAHKAN"
          }`;
        } else if (NIK_PBP_AWAL !== NIK_PBP_PENERIMA) {
          TEXT_STATUS = `<span class="dot bg-secondary"></span>&nbsp;${
            ALASAN !== undefined ? ALASAN.toUpperCase() : "1KK"
          }`;
        }
        if (filterType !== null) {
          if (STATUS === filterType) {
            $("#table-body").append(`
                        <tr role="button" data-bs-toggle="collapse" data-bs-target="#${NIK_PBP_AWAL}" aria-expanded="false" aria-controls="${NIK_PBP_AWAL}">
                            <th scope="row">${NO}</th>
                            <td>${NO_PBP}</td>
                            <td class="${
                              NIK_PBP_AWAL !== NIK_PBP_PENERIMA
                                ? "text-danger font-weight-bold"
                                : ""
                            }">${NIK_PBP_AWAL}</td>
                            <td>${NIK_PBP_PENERIMA}</td>
                            <td>${NAMA_PBP_AWAL}</td>
                            <td>${NAMA_PENERIMA}
                            ${
                              PEKERJAAN === ""
                                ? ""
                                : " (" + PEKERJAAN.toUpperCase() + ")"
                            }
                            </td>
                            <td class="align-middle"><div class="d-flex align-items-center">${TEXT_STATUS}</div></td>
                        </tr>
                        ${
                          STATUS === "-"
                            ? `<tr id="${NIK_PBP_AWAL}" class="collapse ${
                                isShow ? "show" : ""
                              }">
                            <td class="bg-transparent"></td>
                            <td colspan="3">
                                <div class="d-flex overflow-scroll">
                                    <img loading="lazy" src="${url}" width="100%" id="I${NIK_PBP_AWAL}" class="img-zoom-pbp object-fit-contain"/>
                                    <img loading="lazy" src="${urlKtp}" width="100%" id="K${NIK_PBP_AWAL}" class="img-zoom-ktp object-fit-contain"/>
                                </div>
                            </td>
                       
                        </tr>`
                            : ""
                        }

                    `);
          }
        } else {
          $("#table-body").append(`
            <tr role="button" data-bs-toggle="collapse" data-bs-target="#${NIK_PBP_AWAL}" aria-expanded="false" aria-controls="${NIK_PBP_AWAL}" >
                <th scope="row">${NO}</th>
                <td>${NO_PBP}</td>
                <td>${NIK_PBP_AWAL}</td>
                <td>${NIK_PBP_PENERIMA}</td>
                <td>${NAMA_PBP_AWAL}</td>
                <td class="${
                  NAMA_PBP_AWAL !== NAMA_PENERIMA &&
                  STATUS !== "PENGGANTI" &&
                  STATUS !== "PERWAKILAN"
                    ? "text-danger font-weight-bold"
                    : ""
                }">${NAMA_PENERIMA}
                ${PEKERJAAN === "" ? "" : " (" + PEKERJAAN.toUpperCase() + ")"}
                </td>
                <td class="align-middle"><div class="d-flex align-items-center">${TEXT_STATUS}</div></td>
            </tr>
            ${
              STATUS !== "-"
                ? `<tr id="${NIK_PBP_AWAL}" class="collapse ${
                    isShow ? "show" : ""
                  }">
                <td class="bg-transparent"></td>
                <td colspan="3">
                    <div class="d-flex">
                        <img loading="lazy" src="${url}" width="100%" id="I${NIK_PBP_AWAL}" class="img-zoom-pbp object-fit-contain"/>
                        <img loading="lazy" src="${urlKtp}" width="100%" id="K${NIK_PBP_AWAL}" class="img-zoom-ktp object-fit-contain" onclick="rotateImage(K${NIK_PBP_AWAL})"/>
                    </div>
                </td>
            </tr>`
                : ""
            }
        `);
        }
        $("#jumlah-pbp").html("JUMLAH |  " + filter.length);
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
