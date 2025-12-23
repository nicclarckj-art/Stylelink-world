// LOAD SUPABASE
const supabaseUrl = "https://jynctfmghxazxvovaohl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5bmN0Zm1naHhhenh2b3Zhb2hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NDMwNDAsImV4cCI6MjA4MjAxOTA0MH0.2_sNnjCoii3xv4ODIGoDI9sU__YSTAcMckS9OVLBo9w";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

/* =========================
   REGISTER PROFESSIONAL
========================= */
async function registerProfessional(e) {
  e.preventDefault();

  const full_name = document.getElementById("full_name").value;
  const phone = document.getElementById("phone").value;
  const city = document.getElementById("city").value;
  const service = document.getElementById("service").value;

  const { error } = await supabase
    .from("professionals")
    .insert([{ full_name, phone, city, service }]);

  if (error) {
    alert(error.message);
  } else {
    alert("Registration successful!");
    e.target.reset();
  }
}

/* =========================
   SEARCH PROFESSIONALS
========================= */
async function searchProfessionals() {
  const city = document.getElementById("search_city").value;

  let query = supabase.from("professionals").select("*");

  if (city) {
    query = query.ilike("city", `%${city}%`);
  }

  const { data, error } = await query;

  const results = document.getElementById("results");
  results.innerHTML = "";

  if (error) {
    results.innerHTML = "Error loading results";
    return;
  }

  data.forEach(p => {
    results.innerHTML += `
      <div class="card">
        <strong>${p.full_name}</strong><br>
        ${p.service}<br>
        ${p.city}<br>
        📞 ${p.phone}
      </div>
    `;
  });
}

/* =========================
   ADMIN DASHBOARD
========================= */
async function loadAdmin() {
  const { data, error } = await supabase
    .from("professionals")
    .select("*")
    .order("created_at", { ascending: false });

  const adminList = document.getElementById("admin_list");
  adminList.innerHTML = "";

  if (error) {
    adminList.innerHTML = "Error loading admin data";
    return;
  }

  data.forEach(p => {
    adminList.innerHTML += `
      <div class="card">
        <b>${p.full_name}</b><br>
        ${p.service} - ${p.city}<br>
        ${p.phone}
      </div>
    `;
  });
}
