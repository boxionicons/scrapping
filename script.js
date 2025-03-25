// Validasi Nomor Awalan
const validPrefixes = [
    "0811", "0812", "0813", "0821", "0822", "0823", "0852", "0853", "0851", 
    "0814", "0815", "0816", "0855", "0856", "0857", "0858", 
    "0817", "0818", "0819", "0859", "0877", "0878", 
    "0838", "0831", "0832", "0833", 
    "0895", "0896", "0897", "0898", "0899", 
    "0881", "0882", "0883", "0884", "0885", "0886", "0887", "0888", "0889" 
];

document.getElementById("nomor").addEventListener("input", function() {
    let nomor = this.value.replace(/\D/g, ""); 
    let errorMsg = document.getElementById("error-msg");
    let submitBtn = document.getElementById("submitBtn");

    if (nomor.length < 4) {
        errorMsg.textContent = "Nomor Minimal 12 Digit!.";
        submitBtn.disabled = true;
        return;
    }

    let prefix = nomor.substring(0, 4);
    if (!validPrefixes.includes(prefix)) {
        errorMsg.textContent = "Nomor Tidak Valid!.";
        submitBtn.disabled = true;
        return;
    }

    if (nomor.length < 12 || nomor.length > 14) {
        errorMsg.textContent = "Nomor Tidak Terdaftar Di Layanan Operator Resmi!";
        submitBtn.disabled = true;
        return;
    }

    errorMsg.textContent = "";
    submitBtn.disabled = false;
});

document.getElementById("cekForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let nomor = document.getElementById("nomor").value;

    fetch("api/operator.php?nomor=" + nomor)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                document.getElementById("hasil").innerHTML = `
                    <div class="alert alert-success">
                        <h5>Detail Scrapping Nomor</h5>
                        <p><strong>Nomor:</strong> ${data.nomor}</p>
                        <p><strong>Tanggal Registrasi:</strong> ${data.tanggal_registrasi}</p>
                        <p><strong>NIK:</strong> ${data.nik}</p>
                        <p><strong>Penyedia:</strong> ${data.penyedia}</p>
                    </div>
                `;
            } else {
                document.getElementById("hasil").innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
            }
        });
});
