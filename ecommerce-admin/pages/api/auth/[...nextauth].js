export async function isAdminRequest(req,res) {
  return true;
}

export default function handler(req, res) {
  res.status(200).json({ name: 'Bypass Auth' })
}
