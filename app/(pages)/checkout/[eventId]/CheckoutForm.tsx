import React, { useState } from 'react'
import {DB} from '@/app'
import { Button } from '@/components'
import { createTicketAction } from '@/app/(pages)/checkout/[eventId]/action'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast'

const CheckoutForm: React.FC<{event: DB.Event; currentUser: DB.User}> = ({event, currentUser}) => {
  const router = useRouter();
  const isFree = event?.price === '0.00'

  const [isLoading, setIsLoading] = useState<Boolean>(false); 
  const [ticketData, setTicketData] = useState<DB.Ticket>({
    id: '',
    eventId: event.id,
    eventName: event.title,
    status: isFree ? 'free' : 'unpaid',
    price: event.price,
    userId: currentUser.id,
    name: currentUser.name.korean,
    email: currentUser.email,
    firstTime: '',
    occupation: '',
    work: '',
    location: '',
    message: '',
    createdAt: new Date(),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setTicketData({
      ...ticketData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFree) {
      setIsLoading(true);
      try {
        await createTicketAction(ticketData);
        toast.success('Thank you for reserving your spot!');
      } catch (error) {
        toast.error('An error occurred while reserving your spot.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      router.push('/payment');
    }
  };

  return (
    <div className="w-full flex-center">
      <div className="w-full flex items-center justify-center">
        <div className="w-full p-6">
          <div className="mb-5">
            <h1 className="text-xl text-royalBlue-800 font-semibold animate-bounce">
              {event?.title}
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mb-4">
              <h3 className="text-sm text-gray-700 font-semibold text-start">
                KDD 밋업에 처음 참석하시나요? <span className="required text-red-500">*</span>
              </h3>
              <div className="flex items-center gap-5">
                <span className="flex gap-2">
                  <input
                    type="radio"
                    name="firstTime"
                    value="Yes"
                    required
                    className="form-radio text-royalBlue-500"
                    onChange={handleChange}
                  />
                  <label htmlFor="yes" className="text-sm text-gray-700 font-medium">
                    Yes
                  </label>
                </span>
                <span className="flex gap-2">
                  <input
                    type="radio"
                    name="firstTime"
                    value="No"
                    className="form-radio text-royalBlue-500"
                    onChange={handleChange}
                  />
                  <label htmlFor="no" className="text-sm text-gray-700 font-medium">
                    No
                  </label>
                </span>
              </div>
            </div>

            {currentUser?.name ? (
              <div className="flex gap-2 mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 text-start">
                  Full Name <span className="text-xs">(한글/영어)</span>:
                </label>
                <div className="text-[13px] text-start font-semibold text-royalBlue-700">
                  {currentUser?.name.korean}/ {currentUser?.name.english}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 text-start">
                  Full Name <span className="text-xs">(한글/영어)</span>:
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="홍길동/Gilbert Hong"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-royalBlue-500"
                />
              </div>
            )}

            {currentUser?.email ? (
              <div className="flex gap-2 mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 text-start">
                  Email:
                </label>
                <div className="text-[13px] text-start font-semibold text-royalBlue-700">
                  {currentUser?.email}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 text-start">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-royalBlue-500"
                />
              </div>
            )}

            <div className="flex flex-col gap-2 mb-4">
              <label
                htmlFor="occupation"
                className="block text-sm font-medium text-gray-700 text-start">
                Occupation: <span className="required text-red-500">*</span>
              </label>
              <div className="flex">
                <select
                  name="occupation"
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-royalBlue-500">
                  <option value="">Select an option</option>
                  <option value="developer">개발자</option>
                  <option value="designer">디자이너</option>
                  <option value="student">학생</option>
                  <option value="other">기타</option>
                </select>
                {/* {formData.occupation === 'other' && (
                <input
                  required
                  type="text"
                  name="customOccupation"
                  // bind:value={formData.customOccupation}
                  placeholder="직업을 입력해주세요"
                  className="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-royalBlue-500"
                />
              )} */}
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="work" className="block text-sm font-medium text-gray-700 text-start">
                Work: <span className="required text-red-500">*</span>
              </label>
              <input
                type="text"
                name="work"
                onChange={handleChange}
                required
                placeholder="학교명, 회사명, 프리랜서, 기타"
                className="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-royalBlue-500"
              />
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="work" className="block text-sm font-medium text-gray-700 text-start">
                Location: <span className="required text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                onChange={handleChange}
                required
                placeholder="다운타운, 밴쿠버, 버나비, 코퀴틀람, 리치몬드, 기타"
                className="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-royalBlue-500"
              />
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 text-start">
                Message:{' '}
              </label>
              <textarea
                onChange={handleChange}
                name="message"
                rows={6}
                placeholder="본 이벤트에 대한 건의사항이나 KDD 운영진에 하시고 싶은 말이 있으시면 남겨주세요. 행사 운영에 적극 반영할 예정입니다."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-royalBlue-500 text-sm"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                loading={isLoading}
                className="p-4 text-sm">
                {isFree ? 'Reserve' : 'Continue to Payment'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm
