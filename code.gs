function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('Absensi Siswa')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function prosesAbsen(idSiswa, status) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetAbsen = ss.getSheetByName('Absensi');
  var today = Utilities.formatDate(new Date(), "GMT+7", "dd-MM-yyyy");
  
  // Cek apakah sudah absen hari ini
  var data = sheetAbsen.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] == today && data[i][2] == idSiswa) {
      return "Anda sudah absen hari ini!";
    }
  }
  
  // Ambil nama siswa dari sheet DataSiswa
  var dataSiswa = ss.getSheetByName('DataSiswa').getDataRange().getValues();
  var nama = "Tidak Ditemukan";
  for (var j = 1; j < dataSiswa.length; j++) {
    if (dataSiswa[j][0] == idSiswa) { nama = dataSiswa[j][1]; break; }
  }
  
  sheetAbsen.appendRow([new Date(), today, idSiswa, nama, status]);
  return "Berhasil absen: " + status;
}
