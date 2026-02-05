// ================== Dynamic Dashboard Data ==================
const dashboardData = {
  storeName: "متجر تيوان",
  revenue: 12450,
  messagesSent: 8420,
  messagesFailed: 130,
  monthlyLimit: 10000
};

function updateDashboard(){
  document.querySelector('.store-name').innerText = dashboardData.storeName;
  document.getElementById('revenue').innerText = dashboardData.revenue + " ر.س";
  document.getElementById('messagesSent').innerText = dashboardData.messagesSent;
  document.getElementById('messagesFailed').innerText = dashboardData.messagesFailed;
  const total = dashboardData.messagesSent + dashboardData.messagesFailed;
  document.getElementById('messagesTotal').innerText = total;
  document.getElementById('monthlyLimit').innerText = dashboardData.monthlyLimit;
  const progressPercent = (dashboardData.messagesSent / dashboardData.monthlyLimit)*100;
  document.getElementById('progressBar').style.width = progressPercent + "%";

  // Reports section
  document.getElementById('repMessagesSent').innerText = dashboardData.messagesSent;
  document.getElementById('repMessagesFailed').innerText = dashboardData.messagesFailed;
  document.getElementById('repRevenue').innerText = dashboardData.revenue + " ر.س";
}

// ================== Navigation ==================
function showSection(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ================== WhatsApp ==================
let accounts = [];
const whatsappList = document.getElementById("whatsappAccounts");
const addWhatsappBtn = document.getElementById("addWhatsappBtn");

addWhatsappBtn.addEventListener("click", ()=>{
  const phone = prompt("أدخل رقم الهاتف للحساب الجديد:");
  const name = prompt("أدخل اسم الحساب:");
  if(phone && name){
    const account = {id:Date.now(), phone, name, status:"غير مفعل"};
    accounts.push(account);
    renderAccounts();
  }
});

function renderAccounts(){
  whatsappList.innerHTML="";
  accounts.forEach(acc=>{
    const li = document.createElement("li");
    li.innerHTML=`<span class="account-name">${acc.name} (${acc.phone}) - ${acc.status}</span>
      <button class="delete-account" onclick="deleteAccount(${acc.id})">حذف</button>
      <button class="btn-outline" onclick="sendMessage(${acc.id})">إرسال رسالة</button>`;
    whatsappList.appendChild(li);
  });
}

function deleteAccount(id){
  accounts = accounts.filter(a=>a.id!==id);
  renderAccounts();
}

// ================== Message Simulation ==================
function sendMessage(accountId){
  const acc = accounts.find(a=>a.id===accountId);
  if(!acc) return;

  if(dashboardData.messagesSent >= dashboardData.monthlyLimit){
    alert("⚠️ تم الوصول إلى الحد الشهري للرسائل!");
    return;
  }

  // محاكاة نجاح أو فشل الرسالة (90% نجاح - 10% فشل)
  const isSuccess = Math.random() < 0.9;
  if(isSuccess){
    dashboardData.messagesSent++;
    alert(`✅ تم إرسال الرسالة بنجاح للحساب: ${acc.name}`);
  } else {
    dashboardData.messagesFailed++;
    alert(`❌ فشل إرسال الرسالة للحساب: ${acc.name}`);
  }

  // تحديث Dashboard بعد كل رسالة
  updateDashboard();
}

// ================== Auto Reply ==================
document.getElementById("saveReplyBtn").addEventListener("click", ()=>{
  const text = document.getElementById("autoReplyText").value;
  alert("✅ تم حفظ نص الرد الآلي:\n"+text);
});

// ================== Support Ticket ==================
document.getElementById("submitTicket").addEventListener("click", ()=>{
  const title = document.getElementById("supportTitle").value;
  const desc = document.getElementById("supportDesc").value;
  if(title && desc){
    alert(`✅ تم إرسال التذكرة:\nالعنوان: ${title}\nالوصف: ${desc}`);
    document.getElementById("supportTitle").value="";
    document.getElementById("supportDesc").value="";
  }else{
    alert("❌ يرجى ملء جميع الحقول");
  }
});

// ================== Initialize ==================
updateDashboard();



