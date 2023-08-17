import React, { useState } from 'react';
import { MeetingMember } from '@/types/board/type';
import { sendLetterToServer } from '@/services/letterService';
import { postLetter } from '@/services/userBoard';

interface MeetingMembersProps {
  meetingMembers: MeetingMember[];
  remindData: {
    uuid: string;
  };
}

const RemindDetail = ({ meetingMembers, remindData }: MeetingMembersProps) => {
  const [letterContentsMap, setLetterContentsMap] = useState({});

  const handleSendLetter = async (member) => {
    const letterContents = letterContentsMap[member.memberNo] || '';

    const letterdata = {
      memberNo: member.memberNo,
      uuid: remindData.uuid,
      contents: letterContents,
    };

    console.log('내 편지', letterdata);

    if (letterContents.trim() !== '') {
      await postLetter(member.memberNo, letterdata);
    }
  };

  const handleLetterContentsChange = (memberNo, contents) => {
    setLetterContentsMap((prevContentsMap) => ({
      ...prevContentsMap,
      [memberNo]: contents,
    }));
  };

  return (
    <div className="flex">
      {meetingMembers.map((member) => (
        <div key={member.memberNo}>
          <div className="flex">
            <h3 className="ml-10 form-title">{member.name}</h3>
            {member.polaroids.map((polaroid) => (
              <img
                className="mx-10 w-400 h-400"
                key={polaroid.no}
                src={polaroid.imageFileInfo.fileUrl}
                alt={`폴라로이드 ${polaroid.no}`}
              />
            ))}
            <div className="relative flex flex-col p-4 bg-white rounded-lg w-96">
              <div className="flex-grow">
                {member.letter !== null ? (
                  <p className="p-2">{member.letter.contents}</p>
                ) : (
                  <textarea
                    className="w-full p-2 border rounded resize-none h-5/6"
                    placeholder="편지를 작성하세요..."
                    value={letterContentsMap[member.memberNo] || ''}
                    onChange={(e) =>
                      handleLetterContentsChange(
                        member.memberNo,
                        e.target.value
                      )
                    }
                  ></textarea>
                )}
              </div>
              <button
                className="absolute px-4 py-2 text-white transform -translate-x-1/2 bg-blue-500 rounded bottom-2 left-1/2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                onClick={() => handleSendLetter(member)}
                disabled={member.letter !== null}
              >
                전송
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RemindDetail;
