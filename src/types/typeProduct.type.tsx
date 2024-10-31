export interface Option {
  color: string;
  price: string;
  img: [
    {
      link: string;
      cloudinary_id: string;
    },
  ];
}

interface ReviewProduct {
  name: string;

  comment: string;

  star: number;
}

interface ReplieCommentProduct {
  content: string;

  isAdmin: boolean;

  nameUser: string;

  byUser: string;
}

interface CommentProduct {
  author: string;

  status: string;

  isAdmin: boolean;

  avatar: string;

  content: string;

  byUser: string;

  replies: ReplieCommentProduct[];
}

export interface typeProduct {
  name: string;

  brand: string;

  amount: number;

  blog: string;

  reviews: ReviewProduct[];

  comments: CommentProduct[];

  os: string;

  ram: string;

  battery: string;

  rom: string;

  cameraBefore: string;

  cameraAfter: string;

  special: string;

  screen: string;

  option: Option[];

  slug: string; // system generator  =  name  + ram  + rom
}
