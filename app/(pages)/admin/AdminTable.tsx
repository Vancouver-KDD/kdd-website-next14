import { FC } from 'react';
import * as XLSX from 'xlsx'

interface Ticket {
  id: string;
  createdAt: Date;
  name: string;
  email: string;
  location: string;
  occupation: string;
  work: string;
  field?: string;
  kakao?: string;
  dinner?: string;
  firstTime: string;
  status: string;
  message: string;
}

interface AdminTableProps {
  activeTickets: Ticket[];
  cancelledTickets: Ticket[];
}

const AdminTable: FC<AdminTableProps> = ({ activeTickets, cancelledTickets }) => {

    function exportData(type: string) {
        const fileName = 'KDD행사리스트.' + type
        const table = ticketTable
        const wb = XLSX.utils.table_to_book(table)
        XLSX.writeFile(wb, fileName)
    }
    
  return (
    <div>
      <button
        className="hidden md:block absolute top-0 right-24 m-7 bg-amber-400/75 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded-lg"
        onClick={() => {
          exportData('csv');
        }}
      >
        CSV
      </button>
      <table aria-label="Ticket List" className="w-full" id="print-area">
        <thead>
          <tr className="border text-center bg-royalBlue-50 m-4">

          </tr>
        </thead>
        <tbody>
          {activeTickets.slice().reverse().map((ticket, index) => (
            <tr key={ticket.id} className="border text-center">

            </tr>
          ))}
          <tr className="text-left">

          </tr>
          {cancelledTickets.slice().reverse().map((ticket, index) => (
            <tr key={ticket.id} className="border text-center">

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;