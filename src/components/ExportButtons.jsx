import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default function ExportButtons({ transactions = [] }) {
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Rapport MoneyWise", 14, 16);
    const rows = transactions.map(t => [t.type, t.amount, t.category, t.date]);
    doc.autoTable({ head: [["Type","Montant","Catégorie","Date"]], body: rows, startY: 24 });
    doc.save("moneywise_report.pdf");
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(transactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "moneywise.xlsx");
  };

  return (
    <div className="flex gap-3 mt-4">
      <button onClick={exportPDF} className="px-4 py-2 bg-green-600 text-white rounded">Exporter PDF</button>
      <button onClick={exportExcel} className="px-4 py-2 border rounded">Exporter Excel</button>
    </div>
  );
}
