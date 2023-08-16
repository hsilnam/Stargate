import { MeetingData } from '@/types/event/type';

const MeetingLeftDetail = ({ formData }: { formData: MeetingData }) => {
  const start = formData.startDate;
  const [year, month, dayWithTime] = start.split('-');
  const [day, time] = dayWithTime.split('T'); // "T"를 기준으로 분리하여 일자와 시간을 추출
  const [hour, minute, second] = time.split(':');
  const newDate: Date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second.split('.')[0])
  );
  const stringDate = `${year}-${month}-${day}  ${newDate
    .getHours()
    .toString()
    .padStart(2, '0')}:${newDate.getMinutes().toString().padStart(2, '0')}`;
  const picSec = formData.photoNum * 10;

  return (
    <div className="flex flex-col w-full h-600 justify-between mb-2  text-white font-suit text-14 semibold">
      <p>시작 날짜</p>
      <p>{stringDate}</p>
      <p>대기 시간</p>
      <p>{formData.waitingTime}</p>
      <p>미팅 시간</p>
      <p>{formData.meetingTime}</p>
      <p>촬영 컷 수</p>
      <p>{formData.photoNum}</p>
      <div className="mb-2">
        연예인 1명의 미팅 시간은 사인회 시간 {formData.meetingTime - picSec}
        초와 촬영 시간 {picSec}초를 더한 {formData.meetingTime}초입니다.
      </div>
      <p>그룹</p>
      <p>{formData.groupName}</p>
      <p className="mt-2">멤버</p>
      <table>
        <tbody>
          {formData.meetingMembers.map((member, index) => (
            <tr key={index}>
              <td className="w-28">{member.name}</td>
              <td>
                <a
                  href={`https://stargatea406.netlify.app/star/video?roomId=${member.roomId}`}
                >
                  링크
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingLeftDetail;
