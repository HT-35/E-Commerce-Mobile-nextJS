import { AppDispatch, AppStore, RootState } from '@/lib/redux/store';
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

// thực hiện các action để update state.
// vd:  gọi tới func update số và truyền số 5 vào để update

//    dispatch = useAppDispatch()
//    dispatch(updateNumberBook(5))
export const useAppDispatch: () => AppDispatch = useDispatch;

// lấy ra data từ store
// vd :    const floor= useAppSelector((state) => state.book.number);  ==> 5
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
