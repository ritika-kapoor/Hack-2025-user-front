'use client';

import { ArrowLeft, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function UserHeader() {
  return (
    <>
      <div className="self-stretch px-4 py-2 bg-stone-100 inline-flex justify-between items-center">
          <div className="w-full relative flex justify-between items-center">
              <div className="w-6 h-6 relative overflow-hidden">
                {/* カメラに戻る */}
                <Link href="#">
                  <ArrowLeft className="w-6 h-6 text-zinc-900" />
                </Link>
              </div>
              {/* レシピ一覧をabsoluteで中央に配置 */}
              <div className="absolute left-1/2 -translate-x-1/2 text-center text-neutral-900 text-sm font-bold font-['Noto_Sans_JP'] leading-snug">レシピ一覧</div>
              <Select>
                <SelectTrigger className="h-6 p-2 bg-white rounded flex justify-end items-center gap-1 w-fit">
                  <ArrowUpDown className="w-2.5 h-2 text-neutral-900"/>
                  <SelectValue placeholder="並び替え" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="おすすめ">おすすめ</SelectItem>
                  <SelectItem value="調理時間">調理時間</SelectItem>
                </SelectContent>
              </Select>
          </div>
      </div>
    </>
  );
} 