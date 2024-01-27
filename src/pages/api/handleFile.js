// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as XLSX from 'xlsx'
import fs from 'fs'
export default function handler(req, res) {
  if (req.method != 'POST') {
    res.status(405).json({ message: 'method not allow' })
  }
  try {
    const file = req.body.file;
    const fileFs = fs.readFileSync(file);

    res.status(200).json(fileFs);
    // const fileReader = new FileReader();
    // fileReader.readAsBinaryString(file);
    // fileReader.onload = (event) => {
    //   const buffer = event.target.result;
    //   const wb = XLSX.read(buffer, { type: 'binary' });
    //   const wsname = wb.SheetNames[0];
    //   const ws = wb.Sheets[wsname];
    //   const data = XLSX.utils.sheet_to_json(ws);
    //   res.status(200).json(data);
    // }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
