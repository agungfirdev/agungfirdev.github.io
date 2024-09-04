// $.getJSON("data/KAB. PEMALANG_AGU.json", function (data) {
//   let jumlahPengganti = 0;
//   let jumlahPerwakilan = 0;
//   let jumlahAwal = 0;
//   data.forEach(
//     (
//       {
//         NO,
//         NO_KPM,
//         NIK_PBP_AWAL,
//         NIK_PBP_PENERIMA,
//         NAMA_PBP_AWAL,
//         NAMA_PENERIMA,
//         STATUS,
//         PENERIMA,
//         KOTA,
//         KECAMATAN,
//         DESA,
//         FOTO_URL,
//       },
//       index
//     ) => {
//       if (STATUS === "PENGGANTI") {
//         jumlahPengganti++;
//       }

//       if (STATUS === "PERWAKILAN") {
//         jumlahPerwakilan++;
//       }

//       if (STATUS === "AWAL") {
//         jumlahAwal++;
//       }

//       const url = `https://astridjplb.id/files/img/dokumen/47/JAWATENGAH/${KOTA.replace(
//         " ",
//         ""
//       ).replace(".", "")}/${KECAMATAN.replace(" ", "")}/${DESA.replace(
//         " ",
//         ""
//       )}/${FOTO_URL.split(".")[0]}.jpg`;

//       const urlKtp = `https://astridjplb.id/files/img/dokumen/47/JAWATENGAH/${KOTA.replace(
//         " ",
//         ""
//       ).replace(".", "")}/${KECAMATAN.replace(" ", "")}/${DESA.replace(
//         " ",
//         ""
//       )}/${FOTO_URL.split(".")[0]}_ktp.jpg`;

//       let TEXT_STATUS = "";

//       if (STATUS === "AWAL") {
//         TEXT_STATUS = `<button class="badge rounded-pill bg-dark">AWAL</span>`;
//       } else if (STATUS === "PENGGANTI") {
//         TEXT_STATUS = `<button class="badge rounded-pill bg-success">PENGGANTI</span>`;
//       } else {
//         TEXT_STATUS = `<button class="badge rounded-pill bg-primary">PERWAKILAN</span>`;
//       }
//       $("#table-body").append(`
//             <tr role="button" data-bs-toggle="collapse" data-bs-target="#${NIK_PBP_AWAL}" aria-expanded="false" aria-controls="${NIK_PBP_AWAL}">
//                 <th scope="row">${NO}</th>
//                 <td>${NO_KPM}</td>
//                 <td>${NIK_PBP_AWAL}</td>
//                 <td>${NIK_PBP_PENERIMA}</td>
//                 <td>${NAMA_PBP_AWAL}</td>
//                 <td>${NAMA_PENERIMA}</td>
//                 <td>${TEXT_STATUS}</td>
//             </tr>
//             <tr id="${NIK_PBP_AWAL}" class="collapse">
//                 <td colspan="3">
//                     <div class="d-flex">
//                         <img src="${url}" width="100%"/>
//                         <img src="${urlKtp}" width="100%"/>
//                     </div>
//                 </td>
//             </tr>
//         `);
//       $("#jumlah-awal").html("AWAL |  " + jumlahAwal);
//       $("#jumlah-pengganti").html("PENGGANTI |  " + jumlahPengganti);
//       $("#jumlah-perwakilan").html("PERWAKILAN |  " + jumlahPerwakilan);
//     }
//   );
// });

function showPbp(filter) {
  let jumlahPengganti = 0;
  let jumlahPerwakilan = 0;
  let jumlahAwal = 0;
  filter.forEach(
    (
      {
        NO,
        NO_KPM,
        NIK_PBP_AWAL,
        NIK_PBP_PENERIMA,
        NAMA_PBP_AWAL,
        NAMA_PENERIMA,
        STATUS,
        PENERIMA,
        KOTA,
        KECAMATAN,
        DESA,
        FOTO_URL,
      },
      index
    ) => {
      if (STATUS === "PENGGANTI") {
        jumlahPengganti++;
      }

      if (STATUS === "PERWAKILAN") {
        jumlahPerwakilan++;
      }

      if (STATUS === "AWAL") {
        jumlahAwal++;
      }

      const url = `https://astridjplb.id/files/img/dokumen/47/JAWATENGAH/${KOTA.replace(
        " ",
        ""
      ).replace(".", "")}/${KECAMATAN.replace(" ", "")}/${DESA.replace(
        " ",
        ""
      )}/${FOTO_URL.split(".")[0]}.jpg`;

      const urlKtp = `https://astridjplb.id/files/img/dokumen/47/JAWATENGAH/${KOTA.replace(
        " ",
        ""
      ).replace(".", "")}/${KECAMATAN.replace(" ", "")}/${DESA.replace(
        " ",
        ""
      )}/${FOTO_URL.split(".")[0]}_ktp.jpg`;

      let TEXT_STATUS = "";

      if (STATUS === "AWAL") {
        TEXT_STATUS = `<button class="badge rounded-pill bg-dark">AWAL</span>`;
      } else if (STATUS === "PENGGANTI") {
        TEXT_STATUS = `<button class="badge rounded-pill bg-success">PENGGANTI</span>`;
      } else {
        TEXT_STATUS = `<button class="badge rounded-pill bg-primary">PERWAKILAN</span>`;
      }
      $("#table-body").append(`
                <tr role="button" data-bs-toggle="collapse" data-bs-target="#${NIK_PBP_AWAL}" aria-expanded="false" aria-controls="${NIK_PBP_AWAL}">
                    <th scope="row">${NO}</th>
                    <td>${NO_KPM}</td>
                    <td>${NIK_PBP_AWAL}</td>
                    <td>${NIK_PBP_PENERIMA}</td>
                    <td>${NAMA_PBP_AWAL}</td>
                    <td>${NAMA_PENERIMA}</td>
                    <td>${TEXT_STATUS}</td>
                </tr>
                <tr id="${NIK_PBP_AWAL}" class="collapse">
                    <td colspan="3">
                        <div class="d-flex">
                            <img src="${url}" width="100%"/>
                            <img src="${urlKtp}" width="100%"/>
                        </div>
                    </td>
                </tr>
            `);
      $("#jumlah-pbp").html("JUMLAH |  " + filter.length);
      $("#jumlah-awal").html("AWAL |  " + jumlahAwal);
      $("#jumlah-pengganti").html("PENGGANTI |  " + jumlahPengganti);
      $("#jumlah-perwakilan").html("PERWAKILAN |  " + jumlahPerwakilan);
    }
  );
}
