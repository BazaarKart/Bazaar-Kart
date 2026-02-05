// التنقل بين الأقسام
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ===================== WhatsApp Functionality =====================
let accounts = [];
const whatsappList = document.getElementById("whatsappAccounts");
const addWhatsappBtn = document.getElementById("addWhatsappBtn");

addWhatsappBtn.addEventListener("click", () => {
  const phone = prompt("أدخل رقم الهاتف للحساب الجديد:");
  const name = prompt("أدخل اسم الحساب:");
  if(phone && name){
    const account = {id: Date.now(), phone, name, status: "غير مفعل"};
    accounts.push(account);
    renderAccounts();
  }
});

function renderAccounts(){
  whatsappList.innerHTML = "";
  accounts.forEach(acc => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="account-name">${acc.name} (${acc.phone}) - ${acc.status}</span>
      <button class="delete-account" onclick="deleteAccount(${acc.id})">حذف</button>
    `;
    whatsappList.appendChild(li);
  });
}

function deleteAccount(id){
  accounts = accounts.filter(a => a.id !== id);
  renderAccounts();
}

// ===================== Auto Reply =====================
const saveReplyBtn = document.getElementById("saveReplyBtn");
saveReplyBtn.addEventListener("click", () => {
  const text = document.getElementById("autoReplyText").value;
  alert("✅ تم حفظ نص الرد الآلي:\n" + text);
});

// ===================== Support Ticket =====================
const submitTicketBtn = document.getElementById("submitTicket");
submitTicketBtn.addEventListener("click", () => {
  const title = document.getElementById("supportTitle").value;
  const desc = document.getElementById("supportDesc").value;
  if(title && desc){
    alert(`✅ تم إرسال التذكرة:\nالعنوان: ${title}\nالوصف: ${desc}`);
    document.getElementById("supportTitle").value = "";
    document.getElementById("supportDesc").value = "";
  } else {
    alert("❌ يرجى ملء جميع الحقول");
  }
});

