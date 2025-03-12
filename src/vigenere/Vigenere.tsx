import { useState } from 'react'

const VigenereCipher = () => {
   const [alphabet, setAlphabet] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
   const [plaintext, setPlaintext] = useState('')
   const [key, setKey] = useState('')
   const [encryptedText, setEncryptedText] = useState('')
   const [decryptedText, setDecryptedText] = useState('')
   const [error, setError] = useState('')

   const handleAlphabetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newAlphabet = e.target.value.replace(/\s/g, '')
      if (new Set(newAlphabet).size === newAlphabet.length) {
         setAlphabet(newAlphabet)
         setError('') 
      } else {
         setError('Alphabet không được chứa kí tự trùng lặp')
      }
   }

   const isValidInputPlainText = (input: string) => {
      return input.split('').every((char) => alphabet.includes(char) || char === ' ')
   }
   const isValidInputKey = (input: string) => {
      return input.split('').every((char) => alphabet.includes(char))
   }

   const handlePlainTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value
      if (isValidInputPlainText(input)) {
         setPlaintext(input)
         setError('')
      } else {
         setError('Plaintext chứa kí tự không thuộc alphabet')
      }
   }

   const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value
      if (isValidInputKey(input)) {
         setKey(input)
         setError('')
      } else {
         setError('Key chứa kí tự không thuộc alphabet')
      }
   }

   const repeatKey = (key: string, text: string) => {
      let res = ''
      let keyIndex = 0
      for (let char of text) {
         if (char !== ' ') {
            res += key[keyIndex % key.length]
            keyIndex++
         } else {
            res += ' '
         }
      }
      return res
   }
   const handleEncrypt = (e: React.FormEvent) => {
      e.preventDefault()
      if (!alphabet) {
         setError('Vui lòng nhập Alphabet')
         return
      }
      if (!plaintext || !key) {
         setError('Vui lòng nhập đầy đủ plaintext và key')
         return
      }
      if (!isValidInputPlainText(plaintext) || !isValidInputKey(key)) {
         setError('Plaintext hoặc key chứa kí tự không hợp lệ')
         return
      }
      setError('')
      const alpMap = Object.fromEntries([...alphabet].map((c, i) => [c, i]))
      const rpKey = repeatKey(key, plaintext)
      const encrypted = plaintext
         .split('')
         .map((char, i) => {
            if (char === ' ') {
               return ' '
            } else {
               return alphabet[(alpMap[char] + alpMap[rpKey[i]]) % alphabet.length]
            }
         })
         .join('')
      setEncryptedText(encrypted)
   }

   const decrypt = () => {
      if (!alphabet) {
         setError('Vui lòng nhập Alphabet trước khi giải mã')
         return
      }
      if (!encryptedText || !key) {
         setError('Vui lòng nhập đầy đủ encrypted text và key')
         return
      }
      if (!isValidInputPlainText(encryptedText) || !isValidInputKey(key)) {
         setError('Encrypted text hoặc key chứa kí tự không hợp lệ')
         return
      }
      setError('')
      const alpMap = Object.fromEntries([...alphabet].map((c, i) => [c, i]))
      const rpKey = repeatKey(key, encryptedText)
      const decrypted = encryptedText
         .split('')
         .map((char, i) => {
            if (char === ' ') {
               return ' '
            } else {
               return alphabet[
                  (alpMap[char] - alpMap[rpKey[i]] + alphabet.length) % alphabet.length
               ]
            }
         })
         .join('')
      setDecryptedText(decrypted)
   }

   return (
      
      <div className="flex h-screen items-center justify-center">
         <div className="w-2/3 rounded-lg bg-white p-[50px] shadow-xl">
         <div className="mb-6 flex justify-center">
      </div>
            <div className="grid grid-cols-2 gap-8">
               <form className="space-y-6" onSubmit={handleEncrypt}>
                  <div>
                     <label className="block text-lg font-semibold">Alphabet</label>
                     <input
                        type="text"
                        required
                        className="mt-1 w-full rounded border p-3"
                        placeholder="Nhập alphabet"
                        value={alphabet}
                        onChange={handleAlphabetChange}
                     />
                  </div>
                  <div>
                     <label className="block text-lg font-semibold">PlainText</label>
                     <input
                        type="text"
                        required
                        className="mt-1 w-full rounded border p-3"
                        placeholder="Nhập plaintext"
                        value={plaintext}
                        onChange={handlePlainTextChange}
                     />
                  </div>
                  <div>
                     <label className="block text-lg font-semibold">Key</label>
                     <input
                        type="text"
                        required
                        className="mt-1 w-full rounded border p-3"
                        placeholder="Nhập key"
                        value={key}
                        onChange={handleKeyChange}
                     />
                  </div>
                  {error && <div className="text-sm text-red-500">{error}</div>}
               </form>

               <div className="space-y-6">
                  <div>
                     <label className="block text-lg font-semibold">Mã Hóa</label>
                     <input
                        type="text"
                        className="mt-1 w-full rounded border bg-gray-200 p-3"
                        value={encryptedText}
                        readOnly
                     />
                  </div>
                  <button
                     type="submit"
                     className="w-full rounded bg-blue-600 p-3 text-lg text-white"
                     onClick={handleEncrypt}
                  >
                     Mã hóa
                  </button>
                  <div>
                     <label className="block text-lg font-semibold">Giải Mã</label>
                     <input
                        type="text"
                        className="mt-1 w-full rounded border bg-gray-200 p-3"
                        value={decryptedText}
                        readOnly
                     />
                  </div>
                  <button
                     className="w-full rounded bg-green-600 p-3 text-lg text-white"
                     onClick={decrypt}
                  >
                     Giải mã
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default VigenereCipher