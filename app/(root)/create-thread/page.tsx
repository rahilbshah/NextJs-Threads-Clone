import PostThread from '@/components/forms/PostThread';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

const CreateThreadPage = async () => {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');
  return (
    <>
      <h1 className="head-text">Create Threads</h1>
      <PostThread userId={JSON.stringify(userInfo?._id)} />
    </>
  );
};

export default CreateThreadPage;
