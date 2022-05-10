// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getTimeline } from "../../api-auth";
import { Timeline, TimelineDAO } from "../../models/timeline";

type Data = {
  timeline: TimelineDAO[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const timeline = await getTimeline();
  res.status(200).json({ timeline });
}
